import fs from 'fs';
import { config, ethers } from 'hardhat';

async function main() {
  const HealthRecord = await ethers.getContractFactory('HealthRecord');
  console.log('Deploying HealthRecord...');
  const contract = await HealthRecord.deploy();
  await contract.deployed();
  console.log('HealthRecord deployed to:', contract.address);

  saveFrontendFiles(
    contract.address,
    'HealthRecord'
  );
}


function saveFrontendFiles(
  contractAddress: string,
  contractName: string
) {
  fs.writeFileSync(
    `${config.paths.artifacts}/contracts/contractAddress.ts`,
    `export const ${contractName} = '${contractAddress}'`
  );
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
