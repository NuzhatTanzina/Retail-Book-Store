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
exports.SellerService = void 0;
const common_1 = require("@nestjs/common");
const seller_dto_1 = require("./seller.dto");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const seller_entity_1 = require("./seller.entity");
const class_transformer_1 = require("class-transformer");
const bcrypt = require("bcrypt");
let SellerService = class SellerService {
    constructor(sellerRepository, bookRepository, addressRepository, orderRepository) {
        this.sellerRepository = sellerRepository;
        this.bookRepository = bookRepository;
        this.addressRepository = addressRepository;
        this.orderRepository = orderRepository;
    }
    async AddBooks(Email, book_info) {
        const seller_info = await this.sellerRepository.findOneBy({ Email: Email });
        const bookEntity = this.bookRepository.create(book_info);
        bookEntity.seller = seller_info;
        console.log(seller_info.Seller_ID);
        console.log("Email = " + Email);
        return this.bookRepository.save(bookEntity);
    }
    async ViewAllBooks(email) {
        const data = await this.sellerRepository.find({
            where: { Email: email },
            relations: {
                books: true
            }
        });
        console.log(data);
        return data;
    }
    async ViewSingleBook(id) {
        return this.bookRepository.findOneBy({ Book_ID: id });
    }
    async UpdateBookInfo(b_id, updated_data) {
        await this.bookRepository.update(b_id, updated_data);
        return this.bookRepository.findOneBy({ Book_ID: b_id });
    }
    DeleteBookInfo(id) {
        this.bookRepository.delete(id);
        return { "Success": "Book Deleted Successfully" };
    }
    async getBookImages(id, res) {
        const currentBook = await this.bookRepository.findOneBy({ Book_ID: id });
        const currentBookDTO = (0, class_transformer_1.plainToClass)(seller_dto_1.BookDTO, currentBook);
        if (currentBook) {
            const currentBookDTO = (0, class_transformer_1.plainToClass)(seller_dto_1.BookDTO, currentBook);
            console.log(currentBookDTO);
            return res.sendFile(currentBookDTO.Book_Image, {
                root: './assets/book_images',
            });
        }
        else {
            return null;
        }
    }
    async getBookData(sellerEmail, searchType, searchItem) {
        const seller = await this.sellerRepository.findOne({ where: { Email: sellerEmail } });
        if (!seller) {
            throw new common_1.NotFoundException('Seller not found');
        }
        const queryBuilder = this.bookRepository.createQueryBuilder('book')
            .where('book.seller.Seller_ID = :sellerId', { sellerId: seller.Seller_ID });
        if (searchType === 'Title') {
            queryBuilder.andWhere('book.Title LIKE :searchItem', {
                searchItem: `%${searchItem}%`,
            });
        }
        else if (searchType === 'Author') {
            queryBuilder.andWhere('book.Author LIKE :searchItem', {
                searchItem: `%${searchItem}%`,
            });
        }
        else if (searchType === 'ISBN') {
            queryBuilder.andWhere('book.ISBN LIKE :searchItem', {
                searchItem: `%${searchItem}%`,
            });
        }
        else if (searchType === 'Condition') {
            queryBuilder.andWhere('book.Condition LIKE :searchItem', {
                searchItem: `%${searchItem}%`,
            });
        }
        else if (searchType === 'Price') {
            queryBuilder.andWhere('book.Price = :searchItem', {
                searchItem,
            });
        }
        return queryBuilder.getMany();
    }
    async Signup(seller_info) {
        seller_info.Profile_Picture = "temp.svg";
        const salt = await bcrypt.genSalt();
        seller_info.Password = await bcrypt.hash(seller_info.Password, salt);
        return this.sellerRepository.save(seller_info);
    }
    async ViewSellerProfile(email) {
        return this.sellerRepository.findOneBy({ Email: email });
    }
    async Login(seller_info) {
        const saved_seller = await this.sellerRepository.findOneBy({ Email: seller_info.Email });
        console.log(saved_seller);
        if (saved_seller != null) {
            const match = await bcrypt.compare(seller_info.Password, saved_seller.Password);
            if (match) {
                return saved_seller;
            }
            else {
                return null;
            }
        }
        return null;
    }
    async UploadSellerImage(email, image) {
        const current_seller = this.sellerRepository.findOneBy({ Email: email });
        if (current_seller) {
            (await current_seller).Profile_Picture = image;
            await this.sellerRepository.update((await current_seller).Seller_ID, (await current_seller));
            return this.sellerRepository.findOneBy({ Seller_ID: (await current_seller).Seller_ID });
        }
    }
    async getSellerImages(email, res) {
        const current_seller = this.sellerRepository.findOneBy({ Email: email });
        if (current_seller) {
            res.sendFile((await current_seller).Profile_Picture, { root: './assets/profile_images' });
        }
    }
    async AddAddress(Seller_Email, address_info) {
        const seller_info = await this.sellerRepository.findOneBy({ Email: Seller_Email });
        if (seller_info != null) {
            const addressEntity = this.addressRepository.create(address_info);
            addressEntity.seller = seller_info;
            return this.addressRepository.save(addressEntity);
        }
        else {
            return null;
        }
    }
    async ViewSellerAddress(Seller_Email) {
        return this.addressRepository.find({
            where: { seller: { Email: Seller_Email } },
            relations: {
                seller: true,
            }
        });
    }
    async UpdateAddress(Seller_Email, updated_data) {
        console.log("Current seller mail = " + Seller_Email);
        const seller_info = await this.sellerRepository.findOneBy({ Email: Seller_Email });
        console.log("Seller ID = " + (await seller_info).Seller_ID);
        const old_address = await this.addressRepository.findOne({
            where: { seller: await seller_info },
        });
        if (old_address != undefined && old_address != null) {
            console.log("Address ID = " + old_address.Address_ID);
            updated_data.Address_ID = old_address.Address_ID;
            await this.addressRepository.update(old_address.Address_ID, updated_data);
        }
        else {
            const addressEntity = this.addressRepository.create(updated_data);
            addressEntity.seller = seller_info;
            await this.addressRepository.save(addressEntity);
        }
        const address = await this.addressRepository.findOneBy({ seller: (await seller_info) });
        if (address) {
            return address;
        }
        else {
            return null;
        }
    }
    async DeleteAddress(Seller_Email) {
        const seller_info = await this.sellerRepository.findOneBy({ Email: Seller_Email });
        const decision = await this.addressRepository.delete({ seller: (await seller_info) });
        if (decision) {
            return null;
        }
        else {
            return { "Error": "Address is not Available" };
        }
    }
    async ViewAllOrders(Seller_Email) {
        const seller = await this.sellerRepository.findOneBy({ Email: Seller_Email });
        console.log("Seller Information = " + seller);
        const sellerId = seller.Seller_ID;
        const orders = await this.orderRepository.find({
            where: {
                seller: { Seller_ID: sellerId },
                Order_Status: (0, typeorm_2.Not)((0, typeorm_2.In)(['Delivered', 'Cancelled'])),
            },
            relations: ['seller'],
        });
        if (orders != null) {
            return orders;
        }
        else {
            return null;
        }
    }
    async ViewSingleOrder(id) {
        const order = await this.orderRepository.findOneBy({ Order_ID: id });
        if (order != null) {
            return order;
        }
        else {
            return null;
        }
    }
    async Update_Order_Status(id, update_status) {
        const order = await this.orderRepository.findOneBy({ Order_ID: id });
        if (order != null) {
            if (update_status == "Delivered") {
                order.Order_Status = "Delivered";
            }
            else if (update_status == "Cancelled") {
                order.Order_Status = "Cancelled";
            }
            else {
                order.Order_Status = "Pending";
            }
            const decision = await this.orderRepository.update(id, order);
            if (decision.affected !== undefined && decision.affected > 0) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }
};
exports.SellerService = SellerService;
exports.SellerService = SellerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(seller_entity_1.SellerEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(seller_entity_1.BookEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(seller_entity_1.AddressEntity)),
    __param(3, (0, typeorm_1.InjectRepository)(seller_entity_1.OrderEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], SellerService);
//# sourceMappingURL=seller.service.js.map