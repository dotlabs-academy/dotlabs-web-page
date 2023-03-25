// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.16;

import "../../lib/forge-std/src/Test.sol";
import {RegistrationManagerScript} from "../../script/RegistrationManager.s.sol";

contract RegistrationManagerTest is Test {
    RegistrationManagerScript public script;

    function setUp() public {
        script = new RegistrationManagerScript();
    }

    function test_deployedCorrectly() public {
        script.run();
    }
}
