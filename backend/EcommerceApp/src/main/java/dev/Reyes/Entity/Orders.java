package dev.Reyes.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "orders")
public class Orders {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "oder_id")
    private Integer order_id;

    @Column(name="user_id")
    private Integer user_id;

    @Column(name="product_id")
    private Integer product_id;

    @Column(name="quantity")
    private Integer quantity;

    @Column(name="address")
    private String address;

    @Column(name="state")
    private String state;

    @Column(name="zip")
    private String zip;

    public Orders() {}

    public Orders(Integer order_id, Integer user_id, Integer product_id, Integer quantity, String address, String state, String zip) {
        this.order_id = order_id;
        this.user_id = user_id;
        this.product_id = product_id;
        this.quantity = quantity;
        this.address = address;
        this.state = state;
        this.zip = zip;
    }

    public Integer getOrder_id() {
        return order_id;
    }

    public void setOrder_id(Integer order_id) {
        this.order_id = order_id;
    }

    public Integer getUser_id() {
        return user_id;
    }

    public void setUser_id(Integer user_id) {
        this.user_id = user_id;
    }

    public Integer getProduct_id() {
        return product_id;
    }

    public void setProduct_id(Integer product_id) {
        this.product_id = product_id;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getZip() {
        return zip;
    }

    public void setZip(String zip) {
        this.zip = zip;
    }

    @Override
    public String toString() {
        return "Orders{" +
                "order_id=" + order_id +
                ", user_id=" + user_id +
                ", product_id=" + product_id +
                ", quantity=" + quantity +
                ", address='" + address + '\'' +
                ", state='" + state + '\'' +
                ", zip='" + zip + '\'' +
                '}';
    }
}
