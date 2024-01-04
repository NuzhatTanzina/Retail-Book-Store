"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SellerController = void 0;
const common_1 = require("@nestjs/common");
const seller_service_1 = require("./seller.service");
const seller_dto_1 = require("./seller.dto");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const session_gaurd_1 = require("./session.gaurd");
let SellerController = class SellerController {
    constructor(sellerService) {
        this.sellerService = sellerService;
    }
    getIndex() {
        return "Hey I am the seller from retail store";
    }
    AddBooks(book_info, myfileobj, session) {
        console.log("Book Image = " + myfileobj.filename);
        console.log("Seller mail session = " + session.Seller_Email);
        book_info.Book_Image = myfileobj.filename;
        if (myfileobj == null) {
            throw new common_1.BadRequestException({
                status: common_1.HttpStatus.BAD_REQUEST,
                message: "Please Upload Image"
            });
        }
        try {
            return this.sellerService.AddBooks(session.Seller_Email, book_info);
        }
        catch (err) {
            return { "Error": err };
        }
    }
    async ViewAllBooks(session) {
        const books = await this.sellerService.ViewAllBooks(session.Seller_Email);
        if (books != null) {
            return books;
        }
        else {
            throw new common_1.NotFoundException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: 'No Books Found',
            });
        }
    }
    async ViewSingleBook(id) {
        const book = await this.sellerService.ViewSingleBook(id);
        console.log("Book = " + book);
        if (id == null) {
            throw new common_1.BadRequestException({
                status: common_1.HttpStatus.BAD_REQUEST,
                message: "Please Enter Book ID"
            });
        }
        if (book != null) {
            return book;
        }
        else {
            throw new common_1.NotFoundException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: "Book not found"
            });
        }
    }
    async UpdateBookInfo(id, updated_data) {
        if (id == null) {
            throw new common_1.BadRequestException({
                status: common_1.HttpStatus.BAD_REQUEST,
                message: "Please Enter Book ID"
            });
        }
        const updated_book = await this.sellerService.UpdateBookInfo(id, updated_data);
        if (updated_book != null) {
            console.log("Updated Book Data = " + updated_book);
            return updated_book;
        }
        else {
            throw new common_1.NotFoundException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: "No Book Found to Update"
            });
        }
    }
    async DeleteBookInfo(id) {
        if (id == null) {
            throw new common_1.BadRequestException({
                status: common_1.HttpStatus.BAD_REQUEST,
                message: "Please Enter Book ID"
            });
        }
        const decision = await this.sellerService.DeleteBookInfo(id);
        if (decision != null) {
            return { "Delete": "Success" };
        }
        else {
            throw new common_1.NotFoundException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: "No Book Found to Delete"
            });
        }
    }
    async getBookImages(id, res) {
        return this.sellerService.getBookImages(id, res);
    }
    Logout(session) {
        if (session.destroy()) {
            return { "Logout": "Success" };
        }
        else {
            return { "Logout": "Failed" };
        }
    }
    async Signup(seller_info) {
        const seller = await this.sellerService.Signup(seller_info);
        if (seller != null) {
            return seller;
        }
        else {
            throw new common_1.BadRequestException({
                status: common_1.HttpStatus.BAD_REQUEST,
                message: "Email Already Exists"
            });
        }
    }
    async Login(seller_info, session) {
        const decision = await this.sellerService.Login(seller_info);
        if (decision != null) {
            session.Seller_Email = seller_info.Email;
            return { "Login": "Success" };
        }
        else {
            throw new common_1.NotFoundException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: "Email or Password is Incorrect"
            });
        }
    }
    async ViewSellerProfile(session) {
        const seller = await this.sellerService.ViewSellerProfile(session.Seller_Email);
        if (seller != null) {
            return seller;
        }
        else {
            throw new common_1.NotFoundException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: "No Seller Found to View Profile"
            });
        }
    }
    async UploadSellerImage(session, myfileobj) {
        console.log(myfileobj);
        if (myfileobj == null) {
            throw new common_1.BadRequestException({
                status: common_1.HttpStatus.BAD_REQUEST,
                message: "Please Upload Image"
            });
        }
        const seller = await this.sellerService.UploadSellerImage(session.Seller_Email, myfileobj.filename);
        if (seller != null) {
            return seller;
        }
        else {
            throw new common_1.NotFoundException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: "No Seller Found to Upload Seller Image"
            });
        }
    }
    async getSellerImages(session, res) {
        return this.sellerService.getSellerImages(session.Seller_Email, res);
    }
    async AddAddress(address_info, session) {
        const address_saved = await this.sellerService.AddAddress(session.Seller_Email, address_info);
        if (address_saved != null) {
            return address_saved;
        }
        else {
            throw new common_1.NotFoundException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: "No Seller Found to Add Address"
            });
        }
    }
    async ViewSellerAddress(session) {
        const seller = await this.sellerService.ViewSellerAddress(session.Seller_Email);
        if (seller != null) {
            return seller;
        }
        else {
            throw new common_1.NotFoundException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: "Seller Address Not Found"
            });
        }
    }
    async UpdateAddress(updated_data, session) {
        const updated_address = await this.sellerService.UpdateAddress(session.Seller_Email, updated_data);
        if (updated_address != null) {
            return updated_address;
        }
        else {
            throw new common_1.NotFoundException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: "No Seller Found to Update Address"
            });
        }
    }
    async DeleteAddress(session) {
        const address = await this.sellerService.DeleteAddress(session.Seller_Email);
        if (address == null) {
            return { "Delete": "Success" };
        }
        else {
            throw new common_1.NotFoundException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: "No Seller Found to Delete Address"
            });
        }
    }
    async ViewAllOrders(session) {
        const orders = await this.sellerService.ViewAllOrders(session.Seller_Email);
        if (orders != null) {
            return orders;
        }
        else {
            throw new common_1.NotFoundException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: "No Orders Found"
            });
        }
    }
    async ViewSingleOrder(id) {
        const order = await this.sellerService.ViewSingleOrder(id);
        if (order != null) {
            return order;
        }
        else {
            throw new common_1.NotFoundException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: "No Order Found"
            });
        }
    }
    async UpdateDeliverStatus(id) {
        console.warn("ID = " + id);
        const updated_order = await this.sellerService.Update_Order_Status(id, "Delivered");
        if (updated_order) {
            return updated_order;
        }
        else {
            throw new common_1.NotFoundException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: "No Order Found to Update"
            });
        }
    }
    async UpdateCancelStatus(id) {
        console.warn("ID = " + id);
        const updated_order = await this.sellerService.Update_Order_Status(id, "Cancelled");
        if (updated_order) {
            return updated_order;
        }
        else {
            throw new common_1.NotFoundException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: "No Order Found to Update"
            });
        }
    }
};
exports.SellerController = SellerController;
__decorate([
    (0, common_1.Get)('/index'),
    (0, common_1.UseGuards)(session_gaurd_1.SessionGuard),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], SellerController.prototype, "getIndex", null);
__decorate([
    (0, common_1.Post)('/add_books'),
    (0, common_1.UseGuards)(session_gaurd_1.SessionGuard),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('myfile', {
        fileFilter: (req, file, cb) => {
            if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
                cb(null, true);
            else {
                cb(new multer_1.MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
            }
        },
        limits: { fileSize: 5000000 },
        storage: (0, multer_1.diskStorage)({
            destination: './assets/book_images',
            filename: function (req, file, cb) {
                cb(null, Date.now() + file.originalname);
            },
        })
    })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [seller_dto_1.BookDTO, Object, Object]),
    __metadata("design:returntype", Object)
], SellerController.prototype, "AddBooks", null);
__decorate([
    (0, common_1.Get)('/books'),
    (0, common_1.UseGuards)(session_gaurd_1.SessionGuard),
    __param(0, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SellerController.prototype, "ViewAllBooks", null);
__decorate([
    (0, common_1.Get)('/books/search_books/:id'),
    (0, common_1.UseGuards)(session_gaurd_1.SessionGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SellerController.prototype, "ViewSingleBook", null);
__decorate([
    (0, common_1.Put)('/books/update_book_info/:id'),
    (0, common_1.UseGuards)(session_gaurd_1.SessionGuard),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, seller_dto_1.BookDTO]),
    __metadata("design:returntype", Promise)
], SellerController.prototype, "UpdateBookInfo", null);
__decorate([
    (0, common_1.Delete)('/books/delete_books/:id'),
    (0, common_1.UseGuards)(session_gaurd_1.SessionGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SellerController.prototype, "DeleteBookInfo", null);
__decorate([
    (0, common_1.Get)('/book/book_image/:id'),
    (0, common_1.UseGuards)(session_gaurd_1.SessionGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], SellerController.prototype, "getBookImages", null);
__decorate([
    (0, common_1.Post)('/logout'),
    __param(0, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], SellerController.prototype, "Logout", null);
__decorate([
    (0, common_1.Post)('/signup'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [seller_dto_1.SellerDTO]),
    __metadata("design:returntype", Promise)
], SellerController.prototype, "Signup", null);
__decorate([
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [seller_dto_1.SellerDTO, Object]),
    __metadata("design:returntype", Promise)
], SellerController.prototype, "Login", null);
__decorate([
    (0, common_1.Get)('/profile'),
    (0, common_1.UseGuards)(session_gaurd_1.SessionGuard),
    __param(0, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SellerController.prototype, "ViewSellerProfile", null);
__decorate([
    (0, common_1.Put)(('/profile/update_profile_info/upload_profile_image')),
    (0, common_1.UseGuards)(session_gaurd_1.SessionGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('myfile', {
        fileFilter: (req, file, cb) => {
            if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
                cb(null, true);
            else {
                cb(new multer_1.MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
            }
        },
        limits: { fileSize: 5000000 },
        storage: (0, multer_1.diskStorage)({
            destination: './assets/profile_images',
            filename: function (req, file, cb) {
                cb(null, Date.now() + file.originalname);
            },
        })
    })),
    __param(0, (0, common_1.Session)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SellerController.prototype, "UploadSellerImage", null);
__decorate([
    (0, common_1.Get)('/profile/profile_image'),
    (0, common_1.UseGuards)(session_gaurd_1.SessionGuard),
    __param(0, (0, common_1.Session)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SellerController.prototype, "getSellerImages", null);
__decorate([
    (0, common_1.Post)('profile/add_address'),
    (0, common_1.UseGuards)(session_gaurd_1.SessionGuard),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [seller_dto_1.AddressDTO, Object]),
    __metadata("design:returntype", Promise)
], SellerController.prototype, "AddAddress", null);
__decorate([
    (0, common_1.Get)('profile/address'),
    (0, common_1.UseGuards)(session_gaurd_1.SessionGuard),
    __param(0, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SellerController.prototype, "ViewSellerAddress", null);
__decorate([
    (0, common_1.Put)('profile/update_profile_info/update_address'),
    (0, common_1.UseGuards)(session_gaurd_1.SessionGuard),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [seller_dto_1.AddressDTO, Object]),
    __metadata("design:returntype", Promise)
], SellerController.prototype, "UpdateAddress", null);
__decorate([
    (0, common_1.Delete)('profile/delete_address'),
    (0, common_1.UseGuards)(session_gaurd_1.SessionGuard),
    __param(0, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SellerController.prototype, "DeleteAddress", null);
__decorate([
    (0, common_1.Get)('orders/view_all_orders'),
    __param(0, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SellerController.prototype, "ViewAllOrders", null);
__decorate([
    (0, common_1.Get)('orders/view_single_order/:id'),
    (0, common_1.UseGuards)(session_gaurd_1.SessionGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SellerController.prototype, "ViewSingleOrder", null);
__decorate([
    (0, common_1.Get)('orders/deliver/:id'),
    (0, common_1.UseGuards)(session_gaurd_1.SessionGuard),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SellerController.prototype, "UpdateDeliverStatus", null);
__decorate([
    (0, common_1.Get)('orders/cancel/:id'),
    (0, common_1.UseGuards)(session_gaurd_1.SessionGuard),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SellerController.prototype, "UpdateCancelStatus", null);
exports.SellerController = SellerController = __decorate([
    (0, common_1.Controller)('seller'),
    __metadata("design:paramtypes", [seller_service_1.SellerService])
], SellerController);
//# sourceMappingURL=seller.controller.js.map