// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "../lib/forge-std/src/Script.sol";
import "../src/RegistrationManager.sol";

contract RegistrationManagerScript is Script {
    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        uint256 initialRegistrationFee = 0.1 ether;
        RegistrationManager registrationManager = new RegistrationManager(initialRegistrationFee);

        vm.stopBroadcast();
    }
}
