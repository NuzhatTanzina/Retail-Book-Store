export declare class BookDTO {
    Book_ID: number;
    Title: string;
    Author: string;
    ISBN: string;
    Condition: string;
    Price: string;
    Book_Image: string;
}
export declare class SellerDTO {
    Seller_ID: number;
    Name: string;
    Email: string;
    Password: string;
    Phone: string;
    Profile_Picture: string;
}
export declare class AddressDTO {
    Address_ID: number;
    Street: string;
    Building: string;
    City: string;
    Country: string;
    ZIP: string;
}
export declare class OrderDTO {
    Order_ID: number;
    Order_Date: string;
    Order_Status: string;
    Book_Name: string;
    Book_Price: string;
}
