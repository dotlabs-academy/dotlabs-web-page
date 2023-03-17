// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "../lib/forge-std/src/Script.sol";
import "../src/RegistrationManager.sol";

contract RegistrationManagerScript is Script {
    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        // address deployerAddress = vm.envAddress("DEPLOYER_ADDRESS");
        // uint256 defaultAnvilWallet = 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80;
        vm.startBroadcast(deployerPrivateKey);

        uint256 initialRegistrationFee = 0.1 ether;
        RegistrationManager registrationManager = new RegistrationManager(initialRegistrationFee);
        

        vm.stopBroadcast();
    }
}
