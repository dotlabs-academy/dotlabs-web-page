// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "../../lib/forge-std/src/Test.sol";
import "../../src/RegistrationManager.sol";

contract RegistrationManagerTest is Test {
    RegistrationManager registrationManager;
    uint256 registrationFee;

    function setUp() public {
        registrationFee = 0.1 ether;

        registrationManager = new RegistrationManager();
        registrationManager.updateRegistrationFee(registrationFee);
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
        vm.expectRevert("NotRegistered");
        registrationManager.confirmParticipant(sender);
    }

    // function testRefundFee() public {}

    // function testRefundFeeFailWhenNotPaused() public {}

    // function testRefundFeeFailWhenNotAdmin() public {}

    // function testResetParticipantsFailWhenNotPaused() public {}

    // function testResetParticipantsFailWhenNotAdmin() public {}

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
