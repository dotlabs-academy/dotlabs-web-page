// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.16;

import "../lib/forge-std/src/Test.sol";
import {RegistrationManager} from "../src/RegistrationManager.sol";

contract RegistrationManagerTest is Test {
    RegistrationManager public manager;

    function setUp() public {
        uint256 initialFee = 0.4 ether;
        manager = new RegistrationManager(initialFee);
    }

    function test_deployedCorrectly() public {
        assertEq(manager.registrationFee(), 0.4 ether);
        assertEq(manager.isJoined(address(this)), false);
        assertEq(manager.isConfirmed(address(this)), false);
        assertEq(manager.getJoinedUsers(), new address[](0));
        assertEq(manager.hasRole(manager.DEFAULT_ADMIN_ROLE(), address(this)), true);
    }

    function test_updateRegistrationFee() public {
        uint256 newFee = 0.5 ether;
        manager.updateRegistrationFee(newFee);
        assertEq(manager.registrationFee(), newFee);
    }

    function test_failWhenNotAdminRole_updateRegistrationFee() public {
        uint256 newFee = 0.5 ether;
        address notAdmin = address(1);

        vm.expectRevert(
            "AccessControl: account 0x0000000000000000000000000000000000000001 is missing role 0x0000000000000000000000000000000000000000000000000000000000000000"
        );
        vm.prank(notAdmin);
        manager.updateRegistrationFee(newFee);
    }
}
