// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.16;

import "../../lib/forge-std/src/Test.sol";
import {RegistrationManager} from "../../src/RegistrationManager.sol";

contract RegistrationManagerTest is Test {
    RegistrationManager public manager;
    bytes32 DEFAULT_ADMIN_ROLE = 0x00;

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

    function test_joinIn() public {
        address user = address(1);
        uint256 fee = 0.4 ether;
        vm.deal(user, fee + 0.1 ether);

        vm.prank(user);
        manager.joinIn{value: fee}();

        assertEq(manager.isJoined(user), true);
        assertEq(manager.isConfirmed(user), false);
        assertEq(manager.lastFeePaid(user), fee);
        assertEq(manager.getJoinedUsers().length, 1);
    }

    function test_failWhenContractCaller_joinIn() public {
        uint256 fee = manager.registrationFee();

        vm.expectRevert("RegistrationManager: contract caller");
        manager.joinIn{value: fee}();
    }

    function test_failWhenInvalidFee_joinIn() public {
        address user = address(1);
        uint256 fee = 0.4 ether;
        vm.deal(user, fee + 0.1 ether);

        vm.expectRevert("RegistrationManager: invalid fee");
        vm.prank(user);
        manager.joinIn{value: fee + 1}();
    }

    function test_failWhenAlreadyJoined_joinIn() public {
        address user = address(1);
        uint256 fee = 0.4 ether;
        vm.deal(user, fee + 1 ether);

        vm.prank(user);
        manager.joinIn{value: fee}();

        vm.expectRevert("RegistrationManager: already joined");
        vm.prank(user);
        manager.joinIn{value: fee}();
    }

    function test_failWhenAlreadyConfirmed_joinIn() public {
        address user = address(1);
        uint256 fee = 0.4 ether;
        vm.deal(user, fee + 1 ether);

        vm.prank(user);
        manager.joinIn{value: fee}();

        manager.confirmUserQuota(user);

        vm.expectRevert("RegistrationManager: already confirmed");
        vm.prank(user);
        manager.joinIn{value: fee}();
    }

    function test_failWhenPaused_joinIn() public {
        address user = address(1);
        uint256 fee = 0.4 ether;
        vm.deal(user, fee + 1 ether);

        manager.pause();

        vm.expectRevert("Pausable: paused");
        vm.prank(user);
        manager.joinIn{value: fee}();
    }

    function test_confirmUserQuota() public {
        address user = address(1);
        uint256 fee = 0.4 ether;
        vm.deal(user, fee + 1 ether);

        vm.prank(user);
        manager.joinIn{value: fee}();

        manager.confirmUserQuota(user);

        assertEq(manager.isJoined(user), true);
        assertEq(manager.isConfirmed(user), true);
        assertEq(manager.lastFeePaid(user), fee);
        assertEq(manager.getJoinedUsers().length, 1);
    }

    function test_failWhenNotJoined_confirmUserQuota() public {
        address user = address(1);

        vm.expectRevert("RegistrationManager: not joined");
        manager.confirmUserQuota(user);
    }

    function test_failWhenAlreadyConfirmed_confirmUserQuota() public {
        address user = address(1);
        uint256 fee = 0.4 ether;
        vm.deal(user, fee + 1 ether);

        vm.prank(user);
        manager.joinIn{value: fee}();

        manager.confirmUserQuota(user);

        vm.expectRevert("RegistrationManager: already confirmed");
        manager.confirmUserQuota(user);
    }

    function test_failWhenNotAdmin_confirmUserQuota() public {
        address user = address(1);
        uint256 fee = 0.4 ether;
        vm.deal(user, fee + 1 ether);

        vm.prank(user);
        manager.joinIn{value: fee}();

        address notAdmin = address(2);

        vm.expectRevert(
            "AccessControl: account 0x0000000000000000000000000000000000000002 is missing role 0x0000000000000000000000000000000000000000000000000000000000000000"
        );
        vm.prank(notAdmin);
        manager.confirmUserQuota(user);
    }

    function test_failWhenZeroAddress_confirmUserQuota() public {
        address user = address(0);

        vm.expectRevert("RegistrationManager: zero address");
        manager.confirmUserQuota(user);
    }

    function test_confirmUserQuotaBatch() public {
        address user1 = address(1);
        address user2 = address(2);
        address user3 = address(3);
        uint256 fee = 0.4 ether;
        vm.deal(user1, fee + 1 ether);
        vm.deal(user2, fee + 1 ether);
        vm.deal(user3, fee + 1 ether);

        vm.prank(user1);
        manager.joinIn{value: fee}();
        vm.prank(user2);
        manager.joinIn{value: fee}();
        vm.prank(user3);
        manager.joinIn{value: fee}();

        address[] memory users = new address[](3);
        users[0] = user1;
        users[1] = user2;
        users[2] = user3;

        manager.confirmUserQuotaBatch(users);

        assertEq(manager.isJoined(user1), true);
        assertEq(manager.isConfirmed(user1), true);
        assertEq(manager.lastFeePaid(user1), fee);
        assertEq(manager.isJoined(user2), true);
        assertEq(manager.isConfirmed(user2), true);
        assertEq(manager.lastFeePaid(user2), fee);
        assertEq(manager.isJoined(user3), true);
        assertEq(manager.isConfirmed(user3), true);
        assertEq(manager.lastFeePaid(user3), fee);
        assertEq(manager.getJoinedUsers().length, 3);
    }

    function test_failWhenNotAdmin_confirmUserQuotaBatch() public {
        address user1 = address(1);
        address user2 = address(2);
        address user3 = address(3);
        uint256 fee = 0.4 ether;
        vm.deal(user1, fee + 1 ether);
        vm.deal(user2, fee + 1 ether);
        vm.deal(user3, fee + 1 ether);

        vm.prank(user1);
        manager.joinIn{value: fee}();
        vm.prank(user2);
        manager.joinIn{value: fee}();
        vm.prank(user3);
        manager.joinIn{value: fee}();

        address[] memory users = new address[](3);
        users[0] = user1;
        users[1] = user2;
        users[2] = user3;

        address notAdmin = address(2);

        vm.expectRevert(
            "AccessControl: account 0x0000000000000000000000000000000000000002 is missing role 0x0000000000000000000000000000000000000000000000000000000000000000"
        );
        vm.prank(notAdmin);
        manager.confirmUserQuotaBatch(users);
    }

    function test_reset() public {
        address user1 = address(1);
        address user2 = address(2);
        address user3 = address(3);
        uint256 fee = 0.4 ether;
        vm.deal(user1, fee + 1 ether);
        vm.deal(user2, fee + 1 ether);
        vm.deal(user3, fee + 1 ether);

        vm.prank(user1);
        manager.joinIn{value: fee}();
        vm.prank(user2);
        manager.joinIn{value: fee}();
        vm.prank(user3);
        manager.joinIn{value: fee}();

        address[] memory users = new address[](3);
        users[0] = user1;
        users[1] = user2;
        users[2] = user3;

        manager.confirmUserQuotaBatch(users);

        manager.reset();

        assertEq(manager.isJoined(user1), false);
        assertEq(manager.isConfirmed(user1), false);
        assertEq(manager.lastFeePaid(user1), 0);
        assertEq(manager.isJoined(user2), false);
        assertEq(manager.isConfirmed(user2), false);
        assertEq(manager.lastFeePaid(user2), 0);
        assertEq(manager.isJoined(user3), false);
        assertEq(manager.isConfirmed(user3), false);
        assertEq(manager.lastFeePaid(user3), 0);
        assertEq(manager.getJoinedUsers().length, 0);
    }

    function test_failWhenNotAdmin_reset() public {
        address user1 = address(1);
        address user2 = address(2);
        address user3 = address(3);
        uint256 fee = 0.4 ether;
        vm.deal(user1, fee + 1 ether);
        vm.deal(user2, fee + 1 ether);
        vm.deal(user3, fee + 1 ether);

        vm.prank(user1);
        manager.joinIn{value: fee}();
        vm.prank(user2);
        manager.joinIn{value: fee}();
        vm.prank(user3);
        manager.joinIn{value: fee}();

        address[] memory users = new address[](3);
        users[0] = user1;
        users[1] = user2;
        users[2] = user3;

        manager.confirmUserQuotaBatch(users);

        address notAdmin = address(2);

        vm.expectRevert(
            "AccessControl: account 0x0000000000000000000000000000000000000002 is missing role 0x0000000000000000000000000000000000000000000000000000000000000000"
        );
        vm.prank(notAdmin);
        manager.reset();
    }

    function test_refundFee() public {
        address user = address(1);
        uint256 fee = 0.4 ether;
        vm.deal(user, fee + 1 ether);

        vm.prank(user);
        manager.joinIn{value: fee}();

        manager.refundFee(user);

        assertEq(manager.lastFeePaid(user), 0);
    }

    function test_failWhenNotAdmin_refundFee() public {
        address user = address(1);
        uint256 fee = 0.4 ether;
        vm.deal(user, fee + 1 ether);

        vm.prank(user);
        manager.joinIn{value: fee}();

        address notAdmin = address(2);
        vm.expectRevert(
            "AccessControl: account 0x0000000000000000000000000000000000000002 is missing role 0x0000000000000000000000000000000000000000000000000000000000000000"
        );
        vm.prank(notAdmin);
        manager.refundFee(user);
    }

    function test_failWhenZeroAddress_refundFee() public {
        address user = address(1);
        uint256 fee = 0.4 ether;
        vm.deal(user, fee + 1 ether);

        vm.prank(user);
        manager.joinIn{value: fee}();

        address zeroAddress = address(0);
        vm.expectRevert("RegistrationManager: zero address");
        manager.refundFee(zeroAddress);
    }

    function test_refundFeeBatch() public {
        address user1 = address(1);
        address user2 = address(2);
        address user3 = address(3);
        uint256 fee = 0.4 ether;
        vm.deal(user1, fee + 1 ether);
        vm.deal(user2, fee + 1 ether);
        vm.deal(user3, fee + 1 ether);

        vm.prank(user1);
        manager.joinIn{value: fee}();
        vm.prank(user2);
        manager.joinIn{value: fee}();
        vm.prank(user3);
        manager.joinIn{value: fee}();

        address[] memory users = new address[](3);
        users[0] = user1;
        users[1] = user2;
        users[2] = user3;

        manager.refundFeeBatch(users);

        assertEq(manager.lastFeePaid(user1), 0);
        assertEq(manager.lastFeePaid(user2), 0);
        assertEq(manager.lastFeePaid(user3), 0);
    }

    function test_failWhenNotAdmin_refundFeeBatch() public {
        address user1 = address(1);
        address user2 = address(2);
        address user3 = address(3);
        uint256 fee = 0.4 ether;
        vm.deal(user1, fee + 1 ether);
        vm.deal(user2, fee + 1 ether);
        vm.deal(user3, fee + 1 ether);

        vm.prank(user1);
        manager.joinIn{value: fee}();
        vm.prank(user2);
        manager.joinIn{value: fee}();
        vm.prank(user3);
        manager.joinIn{value: fee}();

        address[] memory users = new address[](3);
        users[0] = user1;
        users[1] = user2;
        users[2] = user3;

        address notAdmin = address(2);
        vm.expectRevert(
            "AccessControl: account 0x0000000000000000000000000000000000000002 is missing role 0x0000000000000000000000000000000000000000000000000000000000000000"
        );
        vm.prank(notAdmin);
        manager.refundFeeBatch(users);
    }

    function test_getJoinedUsers() public {
        address user1 = address(1);
        address user2 = address(2);
        address user3 = address(3);
        uint256 fee = 0.4 ether;
        vm.deal(user1, fee + 1 ether);
        vm.deal(user2, fee + 1 ether);
        vm.deal(user3, fee + 1 ether);

        vm.prank(user1);
        manager.joinIn{value: fee}();
        vm.prank(user2);
        manager.joinIn{value: fee}();
        vm.prank(user3);
        manager.joinIn{value: fee}();

        address[] memory joinedUsers = manager.getJoinedUsers();

        assertEq(joinedUsers.length, 3);
        assertEq(joinedUsers[0], user1);
        assertEq(joinedUsers[1], user2);
        assertEq(joinedUsers[2], user3);
    }

    function test_pause() public {
        manager.pause();
        assertEq(manager.paused(), true);
    }

    function test_failWhenNotAdmin_pause() public {
        address notAdmin = address(2);
        vm.expectRevert(
            "AccessControl: account 0x0000000000000000000000000000000000000002 is missing role 0x0000000000000000000000000000000000000000000000000000000000000000"
        );
        vm.prank(notAdmin);
        manager.pause();
    }

    function test_unpause() public {
        manager.pause();
        assertEq(manager.paused(), true);

        manager.unpause();
        assertEq(manager.paused(), false);
    }

    function test_failWhenNotAdmin_unpause() public {
        address notAdmin = address(2);
        vm.expectRevert(
            "AccessControl: account 0x0000000000000000000000000000000000000002 is missing role 0x0000000000000000000000000000000000000000000000000000000000000000"
        );
        vm.prank(notAdmin);
        manager.unpause();
    }

    function test_grantRole() public {
        address user = address(1);
        manager.grantRole(DEFAULT_ADMIN_ROLE, user);
        assertEq(manager.hasRole(DEFAULT_ADMIN_ROLE, user), true);
    }

    function test_failWhenNotAdmin_grantRole() public {
        address user = address(1);
        address notAdmin = address(2);
        vm.expectRevert(
            "AccessControl: account 0x0000000000000000000000000000000000000002 is missing role 0x0000000000000000000000000000000000000000000000000000000000000000"
        );
        vm.prank(notAdmin);
        manager.grantRole(DEFAULT_ADMIN_ROLE, user);
    }

    function test_revokeRole() public {
        address user = address(1);
        manager.grantRole(DEFAULT_ADMIN_ROLE, user);
        assertEq(manager.hasRole(DEFAULT_ADMIN_ROLE, user), true);

        manager.revokeRole(DEFAULT_ADMIN_ROLE, user);
        assertEq(manager.hasRole(DEFAULT_ADMIN_ROLE, user), false);
    }

    function test_failWhenNotAdmin_revokeRole() public {
        address user = address(1);
        manager.grantRole(DEFAULT_ADMIN_ROLE, user);
        assertEq(manager.hasRole(DEFAULT_ADMIN_ROLE, user), true);

        address notAdmin = address(2);
        vm.expectRevert(
            "AccessControl: account 0x0000000000000000000000000000000000000002 is missing role 0x0000000000000000000000000000000000000000000000000000000000000000"
        );
        vm.prank(notAdmin);
        manager.revokeRole(DEFAULT_ADMIN_ROLE, user);
    }
}
