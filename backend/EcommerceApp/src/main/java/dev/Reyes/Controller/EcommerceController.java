package dev.Reyes.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import dev.Reyes.Entity.Account;
import dev.Reyes.Service.AccountService;


import dev.Reyes.Entity.Product;
import dev.Reyes.Service.ProductService;

import dev.Reyes.Entity.Orders;
import dev.Reyes.Service.OrderService;

import java.util.List;


@CrossOrigin
@RestController
public class EcommerceController {
    @Autowired
    AccountService accountService;
    @Autowired
    public ProductService productService;
    @Autowired
    OrderService orderService;

    @Autowired
    public EcommerceController(AccountService accountService,ProductService productService, OrderService orderService){
        this.accountService = accountService;
        this.productService = productService;
        this.orderService = orderService;
    }

    @PostMapping("/register")
    public @ResponseBody ResponseEntity<Account> register(@RequestBody Account account){
        Account existingAccount = accountService.findByEmail(account.getEmail());

        if(existingAccount != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(existingAccount);
        }
        //might want to add password length check and isblank().
        Account newAccount = accountService.addNewUser(account);
        return ResponseEntity.status(HttpStatus.OK).body(newAccount);
    }

    @PostMapping("/login")
        public @ResponseBody ResponseEntity<Account> login(@RequestBody Account credentials){
        Account existingAccount = accountService.findByEmail(credentials.getEmail());

        if (existingAccount == null || !(existingAccount.getPassword().equals(credentials.getPassword()))) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(credentials);
        }
        return ResponseEntity.status(HttpStatus.OK).body(existingAccount);
    }

    @GetMapping("/products")
    public @ResponseBody ResponseEntity<List<Product>> getAllProducts(){
        List<Product> products = productService.getAllProducts();
        return ResponseEntity.status(HttpStatus.OK).body(products);
    }

    @GetMapping("/products/{category}")
    public @ResponseBody ResponseEntity<List<Product>> getCategoryProducts(@PathVariable("category") String category){
        List<Product> products = productService.getProductsByCategory(category);
        return ResponseEntity.status(HttpStatus.OK).body(products);
    }

    @GetMapping("/search/{name}")
    public @ResponseBody ResponseEntity<List<Product>> getSearchProduct(@PathVariable("name") String name){
        List<Product> products = productService.getProductsBySearch(name);
        if(products.isEmpty())
        {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        return ResponseEntity.status(HttpStatus.OK).body(products);
    }

    @PostMapping("/checkout")
    public @ResponseBody ResponseEntity<List<Orders>> orderPurchase(@RequestBody List<Orders> order) {
        for (Orders or : order) {
            int affectedrows = productService.updateStock(or.getProduct_id(), or.getQuantity());
        }
        List<Orders> addOrders = orderService.addNewOrder(order);
        return ResponseEntity.status(HttpStatus.OK).body(addOrders);
    }

}
