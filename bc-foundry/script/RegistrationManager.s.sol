// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.16;

import "../lib/forge-std/src/Script.sol";
import {RegistrationManager} from "../src/RegistrationManager.sol";

contract RegistrationManagerScript is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        uint256 initialFee = 0.4 ether;

        vm.startBroadcast(deployerPrivateKey);

        RegistrationManager registrationManager = new RegistrationManager(initialFee);
        registrationManager; // silence warning

        vm.stopBroadcast();
    }
}
