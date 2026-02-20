import { ethers } from 'hardhat';
import { expect } from 'chai';

describe('SimpleStorage', () => {
  it('should store and retrieve value', async () => {
    const SimpleStorage = await ethers.getContractFactory('SimpleStorage');
    const storage = await SimpleStorage.deploy();
    await storage.deployed();

    await storage.set(42);
    expect(await storage.get()).to.equal(42);
  });

  it('should emit ValueChanged event', async () => {
    const SimpleStorage = await ethers.getContractFactory('SimpleStorage');
    const storage = await SimpleStorage.deploy();

    await expect(storage.set(100))
      .to.emit(storage, 'ValueChanged')
      .withArgs(100);
  });
});
