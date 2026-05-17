package com.expense.model;

import java.sql.Date;

/**
 * Expense Model Class (POJO)
 * Represents an expense record in the database.
 */
public class Expense {
    private int id;
    private String title;
    private String category;
    private double amount;
    private Date date;
    private String description;

    // Default Constructor
    public Expense() {}

    // Parameterized Constructor
    public Expense(int id, String title, String category, double amount, Date date, String description) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.amount = amount;
        this.date = date;
        this.description = description;
    }

    // Getters and Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public double getAmount() { return amount; }
    public void setAmount(double amount) { this.amount = amount; }

    public Date getDate() { return date; }
    public void setDate(Date date) { this.date = date; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}
