/// <reference types="multer" />
import { SellerService } from './seller.service';
import { AddressDTO, BookDTO, SellerDTO } from './seller.dto';
import { BookEntity, SellerEntity } from './seller.entity';
export declare class SellerController {
    private readonly sellerService;
    constructor(sellerService: SellerService);
    getIndex(): any;
    AddBooks(book_info: BookDTO, myfileobj: Express.Multer.File, session: any): object;
    ViewAllBooks(session: any): Promise<SellerEntity[]>;
    ViewSingleBook(id: number): Promise<BookEntity>;
    UpdateBookInfo(id: number, updated_data: BookDTO): Promise<BookEntity>;
    DeleteBookInfo(id: number): Promise<any>;
    getBookImages(id: number, res: any): Promise<any>;
    Logout(session: any): object;
    Signup(seller_info: SellerDTO): Promise<any>;
    Login(seller_info: SellerDTO, session: any): Promise<any>;
    ViewSellerProfile(session: any): Promise<any>;
    UploadSellerImage(session: any, myfileobj: Express.Multer.File): Promise<any>;
    getSellerImages(session: any, res: any): Promise<any>;
    AddAddress(address_info: AddressDTO, session: any): Promise<any>;
    ViewSellerAddress(session: any): Promise<any>;
    UpdateAddress(updated_data: AddressDTO, session: any): Promise<any>;
    DeleteAddress(session: any): Promise<any>;
    ViewAllOrders(session: any): Promise<any>;
    ViewSingleOrder(id: number): Promise<any>;
    UpdateDeliverStatus(id: number): Promise<any>;
    UpdateCancelStatus(id: number): Promise<any>;
}
