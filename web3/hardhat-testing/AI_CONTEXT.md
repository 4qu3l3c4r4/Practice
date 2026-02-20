# AI Context — Hardhat Web3 Testing Template

## Template purpose

Smart contract testing using Hardhat and ethers.js.

## Tech stack

- Hardhat 2.x
- ethers.js 6.x
- Chai
- TypeScript 5.x

## Code patterns

```typescript
import { ethers } from 'hardhat';
import { expect } from 'chai';

describe('Token', () => {
  it('should transfer tokens', async () => {
    const [owner, addr1] = await ethers.getSigners();
    
    const Token = await ethers.getContractFactory('Token');
    const token = await Token.deploy(1000);
    await token.deployed();
    
    await token.transfer(addr1.address, 50);
    expect(await token.balanceOf(addr1.address)).to.equal(50);
  });

  it('should emit event', async () => {
    const Token = await ethers.getContractFactory('Token');
    const token = await Token.deploy(1000);
    
    await expect(token.transfer(addr1.address, 50))
      .to.emit(token, 'Transfer')
      .withArgs(owner.address, addr1.address, 50);
  });

  it('should revert on insufficient balance', async () => {
    const Token = await ethers.getContractFactory('Token');
    const token = await Token.deploy(100);
    
    await expect(token.transfer(addr1.address, 200))
      .to.be.revertedWith('Insufficient balance');
  });
});
```

## Rules

- Test all contract functions
- Verify events are emitted
- Test revert conditions
- Use multiple signers for access control tests
- Test edge cases and overflow
