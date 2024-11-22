// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.2 <0.9.0;

contract Land{


 //defining global variables
    uint public landid=0;
  //  uint public userid=0;


    // land and user detail structure
    struct Land_Details{
        uint owner_adhar;
        uint land_id;
        uint SurveyNo;
        string HissNo;
        uint area;
        bool conventional;
        uint pincode;
    }

    // struct User_details{
    //     uint user_id;
    //     string name;
    //     uint Adhar_no;
    //     uint age;
    // }

    //defining arrays
    Land_Details[] public landdetails;
  //  User_details[] public userdetails;

  ///function to comapare two strings (whether it is same or not)
    function compare(string memory s1,string memory s2) public pure returns(bool){
        bytes32 hash1= keccak256(abi.encodePacked(s1));
        bytes32 hash2= keccak256(abi.encodePacked(s2));
        return hash1==hash2;
    }

    //making land conventional by land officer
    function make_conventional(uint _SurveyNo,
        string memory _HissNo) public {

              for(uint i=0;i< landdetails.length;i++)
            {
                    if(landdetails[i].SurveyNo==_SurveyNo && compare(landdetails[i].HissNo,_HissNo ) )
                    {
                         landdetails[i].conventional=true;

                        break;
                    }
            }


        

    }



    //adding land to block chain
    function add_land(uint _SurveyNo,
        string memory _HissNo,
        uint _area,
        bool _conventional,
        uint _pincode,uint _user_adhar) public{
            landid=landid+1;
            landdetails.push(Land_Details(_user_adhar,landid,_SurveyNo,_HissNo,_area,_conventional,_pincode));
            
        }


    //adding users details to blockchain
    // function add_user(string memory _name,uint _adhar,uint _age) public{
    //     userid=userid+1;
    //     userdetails.push(User_details(userid,_name,_adhar,_age));
    // }




    //request to sell the land
    //we are doing those stuff in frontend only


  



    //function to transfer the land by land officer
    function transfer_land(uint _seller_adhar,uint _buyer_adhar,uint _SurveyNo,
        string memory _HissNo) public {
            for(uint i=0;i< landdetails.length;i++)
            {
                    if(landdetails[i].SurveyNo==_SurveyNo && compare(landdetails[i].HissNo,_HissNo ) && landdetails[i].owner_adhar==_seller_adhar)
                    {
                        landdetails[i].owner_adhar=_buyer_adhar;

                        break;
                    }
            }

    }



    //function to display the land of user to see his land
    function display_land_of_user(uint _adharNo) public view returns(Land_Details[] memory)
    {
        uint counter=0;
        for(uint i=0;i< landdetails.length;i++)
        {
            if(landdetails[i].owner_adhar==_adharNo)
            {
                counter++;
            }
        }
        Land_Details[] memory land=new Land_Details[](counter);
        uint ind=0;
        for(uint i=0;i< landdetails.length;i++)
        {
            if(landdetails[i].owner_adhar==_adharNo)
            {
                land[ind++]=landdetails[i];
            }
        }
        return land;

    }
}
