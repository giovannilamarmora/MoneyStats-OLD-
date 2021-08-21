package com.moneystats.MoneyStats.statement.entity;

import com.moneystats.MoneyStats.auth.User;
import com.moneystats.MoneyStats.model.Wallet;

import javax.persistence.*;

@Entity
@Table(name = "statements")
public class StatementEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String date;
    private double value;
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    @ManyToOne
    @JoinColumn(name = "wallet_id", nullable = false)
    private Wallet wallet;

    public StatementEntity(int id, String date, double value, User user, Wallet wallet) {
        this.id = id;
        this.date = date;
        this.value = value;
        this.user = user;
        this.wallet = wallet;
    }
@Deprecated
    public StatementEntity() {

    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public double getValue() {
        return value;
    }

    public void setValue(double value) {
        this.value = value;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Wallet getWallet() {
        return wallet;
    }

    public void setWallet(Wallet wallet) {
        this.wallet = wallet;
    }
}
