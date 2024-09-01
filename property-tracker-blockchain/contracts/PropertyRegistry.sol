// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

contract PropertyRegistry {
    struct Property {
        string id;
        string location;
        string ownerName;
        address currentOwner;
        string documentHash;
        address[] previousOwners;
    }

    mapping(string => Property) public properties;

    event PropertyRegistered(string id, address owner);
    event OwnershipTransferred(
        string id,
        address previousOwner,
        address newOwner
    );

    function registerProperty(
        string memory _id,
        string memory _location,
        string memory _ownerName,
        string memory _documentHash
    ) public {
        require(
            properties[_id].currentOwner == address(0),
            "Property already registered"
        );

        Property storage newProperty = properties[_id];
        newProperty.id = _id;
        newProperty.location = _location;
        newProperty.ownerName = _ownerName;
        newProperty.currentOwner = msg.sender;
        newProperty.documentHash = _documentHash;      
        newProperty.previousOwners.push(msg.sender);  

        emit PropertyRegistered(_id, msg.sender);
    }

    function transferOwnership(
        string memory _id,
        string memory _newOwnerName,
        address _newOwner
    ) public {
        Property storage property = properties[_id];
        require(
            property.currentOwner == msg.sender,
            "Only the current owner can transfer ownership"
        );
        require(_newOwner != address(0), "New owner address is invalid");

        property.previousOwners.push(_newOwner);
        property.ownerName = _newOwnerName;
        property.currentOwner = _newOwner;

        emit OwnershipTransferred(_id, msg.sender, _newOwner);
    }

    function getOwnershipHistory(
        string memory _id
    ) public view returns (address[] memory) {
        return properties[_id].previousOwners;
    }
}
