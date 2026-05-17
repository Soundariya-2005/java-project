package com.expense.dao;

import com.expense.model.Expense;
import com.expense.util.DBConnection;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Data Access Object (DAO) for Expenses
 * Implements CRUD operations using JDBC PreparedStatement.
 */
public class ExpenseDAO {
    
    // SQL Queries
    private static final String INSERT_SQL = "INSERT INTO expenses (title, category, amount, expense_date, description) VALUES (?, ?, ?, ?, ?)";
    private static final String SELECT_ALL_SQL = "SELECT * FROM expenses ORDER BY expense_date DESC";
    private static final String SELECT_BY_ID_SQL = "SELECT * FROM expenses WHERE id = ?";
    private static final String UPDATE_SQL = "UPDATE expenses SET title=?, category=?, amount=?, expense_date=?, description=? WHERE id=?";
    private static final String DELETE_SQL = "DELETE FROM expenses WHERE id = ?";

    public void addExpense(Expense expense) throws SQLException {
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(INSERT_SQL)) {
            ps.setString(1, expense.getTitle());
            ps.setString(2, expense.getCategory());
            ps.setDouble(3, expense.getAmount());
            ps.setDate(4, expense.getDate());
            ps.setString(5, expense.getDescription());
            ps.executeUpdate();
        }
    }

    public List<Expense> getAllExpenses() throws SQLException {
        List<Expense> expenses = new ArrayList<>();
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(SELECT_ALL_SQL);
             ResultSet rs = ps.executeQuery()) {
            while (rs.next()) {
                expenses.add(new Expense(
                    rs.getInt("id"),
                    rs.getString("title"),
                    rs.getString("category"),
                    rs.getDouble("amount"),
                    rs.getDate("expense_date"),
                    rs.getString("description")
                ));
            }
        }
        return expenses;
    }

    public Expense getExpenseById(int id) throws SQLException {
        Expense expense = null;
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(SELECT_BY_ID_SQL)) {
            ps.setInt(1, id);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    expense = new Expense(
                        rs.getInt("id"),
                        rs.getString("title"),
                        rs.getString("category"),
                        rs.getDouble("amount"),
                        rs.getDate("expense_date"),
                        rs.getString("description")
                    );
                }
            }
        }
        return expense;
    }

    public void updateExpense(Expense expense) throws SQLException {
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(UPDATE_SQL)) {
            ps.setString(1, expense.getTitle());
            ps.setString(2, expense.getCategory());
            ps.setDouble(3, expense.getAmount());
            ps.setDate(4, expense.getDate());
            ps.setString(5, expense.getDescription());
            ps.setInt(6, expense.getId());
            ps.executeUpdate();
        }
    }

    public void deleteExpense(int id) throws SQLException {
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(DELETE_SQL)) {
            ps.setInt(1, id);
            ps.executeUpdate();
        }
    }
}
