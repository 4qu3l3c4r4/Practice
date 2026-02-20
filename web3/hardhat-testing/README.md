# Hardhat Web3 Testing Template

Smart contract testing using Hardhat and ethers.js.

## Setup

```bash
npm install
```

## Run tests

```bash
npx hardhat test
```

## Writing tests

```typescript
import { ethers } from 'hardhat';
import { expect } from 'chai';

describe('MyContract', () => {
  it('should deploy and interact', async () => {
    const [owner] = await ethers.getSigners();
    
    const Contract = await ethers.getContractFactory('MyContract');
    const contract = await Contract.deploy();
    await contract.deployed();
    
    await contract.setValue(42);
    expect(await contract.getValue()).to.equal(42);
  });
});
```
