// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "../lib/forge-std/src/Test.sol";
import "../contracts/RegisterManagerV1.sol";

contract RegisterManagerV1Test is Test {
    RegisterManagerV1 registerManagerV1;
    uint256 registrationFee;

    address ASoto = 0x820FAec66A504901De79fa44D21609d457174f5B;
    address CRodriguez = 0x7D6f2288d6726A2B587B50933cAEC406e3A1F109;

    function setUp() public {
        registerManagerV1 = new RegisterManagerV1();
        registrationFee = registerManagerV1.registrationFee();
    }

    function testJoinIn() public {
        string memory name = "test";
        address sender = address(1);

        vm.deal(sender, 1 ether);
        vm.prank(sender);
        registerManagerV1.joinIn{value: registrationFee}(name);

        Participant memory participant = registerManagerV1.getParticipant(
            sender
        );

        assertEq(participant.name, name);
    }

    function testJoinInFailWithIncorrectValue() public {
        string memory name = "test";
        address sender = address(1);

        vm.deal(sender, 1 ether);
        vm.expectRevert("UnpayedFee");
        vm.prank(sender);
        registerManagerV1.joinIn{value: 0.4 ether}(name);
    }

    function testJoinInFailWhenPaused() public {
        vm.prank(ASoto);
        registerManagerV1.pause();

        string memory name = "test";
        address sender = address(1);

        vm.deal(sender, 1 ether);
        vm.expectRevert("Pausable: paused");
        vm.prank(sender);
        registerManagerV1.joinIn{value: registrationFee}(name);
    }
}
