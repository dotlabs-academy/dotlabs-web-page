// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "../../lib/forge-std/src/Test.sol";
import "../../src/RegistrationManager.sol";

contract RegistrationManagerTest is Test {
    RegistrationManager registrationManager;
    uint256 registrationFee;

    function setUp() public {
        registrationFee = 0.1 ether;
        registrationManager = new RegistrationManager(registrationFee);

        assertEq(registrationManager.registrationFee(), registrationFee);
    }

    function testUpdateRegistrationFee() public {
        uint256 newFee = 0.2 ether;
        registrationManager.updateRegistrationFee(newFee);

        assertTrue(registrationManager.registrationFee() == newFee);
    }

    function testUpdateRegistrationFeeFailWhenNotAdmin() public {
        address notAdmin = address(1);
        uint256 newFee = 0.2 ether;

        vm.prank(notAdmin);
        vm.expectRevert(
            "AccessControl: account 0x0000000000000000000000000000000000000001 is missing role 0x0000000000000000000000000000000000000000000000000000000000000000"
        );
        registrationManager.updateRegistrationFee(newFee);
    }

    function testJoinIn() public {
        address sender = address(1);

        vm.deal(sender, registrationFee + 0.1 ether);
        vm.prank(sender);
        bool success = registrationManager.joinIn{value: registrationFee}();
        assertTrue(success == true);
    }

    function testJoinInFailWithIncorrectValue() public {
        address sender = address(1);
        uint256 incorrectValue = 0.01 ether;

        vm.deal(sender, incorrectValue);
        vm.prank(sender);
        vm.expectRevert("RegistrationFeeNotPayed");
        registrationManager.joinIn{value: incorrectValue}();
    }

    function testJoinInFailWhenPaused() public {
        address sender = address(1);

        registrationManager.pause();
        vm.deal(sender, registrationFee + 0.1 ether);
        vm.prank(sender);
        vm.expectRevert("Pausable: paused");
        registrationManager.joinIn{value: registrationFee}();
    }

    function testConfirmParticipant() public {
        // User registration
        address sender = address(1);
        vm.deal(sender, registrationFee + 0.1 ether);
        vm.prank(sender);
        bool registrationSucces = registrationManager.joinIn{value: registrationFee}();
        assertEq(registrationSucces, true);
        // ADMIN confirmation
        registrationManager.pause();
        bool confirmationSuccess = registrationManager.confirmParticipant(sender);
        assertTrue(confirmationSuccess == true);
    }

    function testConfirmParticipantFailWhenNotPaused() public {
        // User registration
        address sender = address(1);
        vm.deal(sender, registrationFee + 0.1 ether);
        vm.prank(sender);
        bool registrationSucces = registrationManager.joinIn{value: registrationFee}();
        assertEq(registrationSucces, true);
        // ADMIN confirmation without pause
        vm.expectRevert("Pausable: not paused");
        registrationManager.confirmParticipant(sender);
    }

    function testConfirmParticipantFailWhenNotAdmin() public {
        // User registration
        address sender = address(1);
        vm.deal(sender, registrationFee + 0.1 ether);
        vm.prank(sender);
        bool registrationSucces = registrationManager.joinIn{value: registrationFee}();
        assertEq(registrationSucces, true);
        // NOT ADMIN confirmation
        registrationManager.pause();
        address notAdmin = address(2);
        vm.prank(notAdmin);
        vm.expectRevert(
            "AccessControl: account 0x0000000000000000000000000000000000000002 is missing role 0x0000000000000000000000000000000000000000000000000000000000000000"
        );
        registrationManager.confirmParticipant(sender);
    }

    function testConfirmParticipantFailWhenNotJoined() public {
        // User registration
        address sender = address(1);
        // ADMIN confirmation
        registrationManager.pause();
        vm.expectRevert("NotRegistered");
        registrationManager.confirmParticipant(sender);
    }

    function testConfirmParticipantFailWhenZeroAddress() public {
        // ADMIN confirmation
        registrationManager.pause();
        vm.expectRevert("ZeroAddress");
        registrationManager.confirmParticipant(address(0));
    }

    function testConfirmParticipantFailWhenAlreadyConfirmed() public {
        // User registration
        address sender = address(1);
        vm.deal(sender, registrationFee + 0.1 ether);
        vm.prank(sender);
        bool registrationSucces = registrationManager.joinIn{value: registrationFee}();
        assertEq(registrationSucces, true);
        // ADMIN confirmation
        registrationManager.pause();
        bool confirmationSuccess = registrationManager.confirmParticipant(sender);
        assertTrue(confirmationSuccess == true);
        // ADMIN confirmation again
        vm.expectRevert("AlreadyConfirmed");
        registrationManager.confirmParticipant(sender);
    }

    function testRefundFee() public {
        // User registration
        address sender = address(1);
        vm.deal(sender, registrationFee + 0.1 ether);
        vm.prank(sender);
        bool registrationSucces = registrationManager.joinIn{value: registrationFee}();
        assertEq(registrationSucces, true);
        // ADMIN refund
        registrationManager.pause();
        registrationManager.confirmParticipant(sender);
        bool refundSuccess = registrationManager.refundFee(sender);
        assertTrue(refundSuccess == true);
    }

    function testRefundFailWhenNotConfirmed() public {
        address sender = address(1);
        vm.deal(sender, registrationFee + 0.1 ether);
        vm.prank(sender);
        bool registrationSucces = registrationManager.joinIn{value: registrationFee}();
        assertEq(registrationSucces, true);
        // ADMIN refund
        registrationManager.pause();
        vm.expectRevert("NotConfirmed");
        registrationManager.refundFee(sender);
    }

    function testRefundFeeFailWhenNotPaused() public {
        // User registration
        address sender = address(1);
        vm.deal(sender, registrationFee + 0.1 ether);
        vm.prank(sender);
        bool registrationSucces = registrationManager.joinIn{value: registrationFee}();
        assertEq(registrationSucces, true);
        // ADMIN refund
        vm.expectRevert("Pausable: not paused");
        registrationManager.refundFee(sender);
    }

    function testRefundFeeFailWhenNotAdmin() public {
        // User registration
        address sender = address(1);
        vm.deal(sender, registrationFee + 0.1 ether);
        vm.prank(sender);
        bool registrationSucces = registrationManager.joinIn{value: registrationFee}();
        assertEq(registrationSucces, true);
        // ADMIN refund
        registrationManager.pause();
        registrationManager.confirmParticipant(sender);
        address notAdmin = address(2);
        vm.prank(notAdmin);
        vm.expectRevert(
            "AccessControl: account 0x0000000000000000000000000000000000000002 is missing role 0x0000000000000000000000000000000000000000000000000000000000000000"
        );
        registrationManager.refundFee(sender);
    }

    function testReset() public {
        // Users registration
        address sender1 = address(1);
        address sender2 = address(2);

        vm.deal(sender1, registrationFee + 0.1 ether);
        vm.prank(sender1);
        bool registrationSucces1 = registrationManager.joinIn{value: registrationFee}();
        assertEq(registrationSucces1, true);

        vm.deal(sender2, registrationFee + 0.1 ether);
        vm.prank(sender2);
        bool registrationSucces2 = registrationManager.joinIn{value: registrationFee}();
        assertEq(registrationSucces2, true);

        // ADMIN confirmation
        registrationManager.pause();
        registrationManager.confirmParticipant(sender1);
        registrationManager.confirmParticipant(sender2);

        // ADMIN reset
        registrationManager.reset();
        assertTrue(registrationManager.isRegistered(sender1) == false);
        assertTrue(registrationManager.isRegistered(sender2) == false);
        assertTrue(registrationManager.isConfirmed(sender1) == false);
        assertTrue(registrationManager.isConfirmed(sender2) == false);

        address[] memory users = registrationManager.getRegisteredUsers();

        assertTrue(users.length == 0);
    }

    function testResetFailWhenNotPaused() public {
        // Users registration
        address sender1 = address(1);
        address sender2 = address(2);

        vm.deal(sender1, registrationFee + 0.1 ether);
        vm.prank(sender1);
        bool registrationSucces1 = registrationManager.joinIn{value: registrationFee}();
        assertEq(registrationSucces1, true);

        vm.deal(sender2, registrationFee + 0.1 ether);
        vm.prank(sender2);
        bool registrationSucces2 = registrationManager.joinIn{value: registrationFee}();
        assertEq(registrationSucces2, true);

        // ADMIN confirmation
        registrationManager.pause();
        registrationManager.confirmParticipant(sender1);
        registrationManager.confirmParticipant(sender2);
        registrationManager.unpause(); // !

        // ADMIN reset
        vm.expectRevert("Pausable: not paused");
        registrationManager.reset();
    }

    function testResetFailWhenNotAdmin() public {
        // Users registration
        address sender1 = address(1);
        address sender2 = address(2);

        vm.deal(sender1, registrationFee + 0.1 ether);
        vm.prank(sender1);
        bool registrationSucces1 = registrationManager.joinIn{value: registrationFee}();
        assertEq(registrationSucces1, true);

        vm.deal(sender2, registrationFee + 0.1 ether);
        vm.prank(sender2);
        bool registrationSucces2 = registrationManager.joinIn{value: registrationFee}();
        assertEq(registrationSucces2, true);

        // ADMIN confirmation
        registrationManager.pause();
        registrationManager.confirmParticipant(sender1);
        registrationManager.confirmParticipant(sender2);

        // NOT ADMIN reset
        address notAdmin = address(3);
        vm.prank(notAdmin);
        vm.expectRevert(
            "AccessControl: account 0x0000000000000000000000000000000000000003 is missing role 0x0000000000000000000000000000000000000000000000000000000000000000"
        );
        registrationManager.reset();
    }

    function testPause() public {
        registrationManager.pause();
        assertTrue(registrationManager.paused());
    }

    function testUnpause() public {
        registrationManager.pause();
        registrationManager.unpause();
        assertTrue(!registrationManager.paused());
    }
}
