package com.expense.controller;

import com.expense.dao.ExpenseDAO;
import com.expense.model.Expense;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.Date;
import java.sql.SQLException;
import java.util.List;

/**
 * Controller Servlet
 * Routes requests to different CRUD operations.
 */
@WebServlet("/")
public class ExpenseServlet extends HttpServlet {
    private ExpenseDAO expenseDAO;

    public void init() {
        expenseDAO = new ExpenseDAO();
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        doGet(request, response);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        String action = request.getServletPath();

        try {
            switch (action) {
                case "/new":
                    showNewForm(request, response);
                    break;
                case "/insert":
                    insertExpense(request, response);
                    break;
                case "/delete":
                    deleteExpense(request, response);
                    break;
                case "/edit":
                    showEditForm(request, response);
                    break;
                case "/update":
                    updateExpense(request, response);
                    break;
                default:
                    listExpenses(request, response);
                    break;
            }
        } catch (SQLException ex) {
            throw new ServletException(ex);
        }
    }

    private void listExpenses(HttpServletRequest request, HttpServletResponse response) 
            throws SQLException, IOException, ServletException {
        List<Expense> listExpense = expenseDAO.getAllExpenses();
        request.setAttribute("listExpense", listExpense);
        request.getRequestDispatcher("expense-list.jsp").forward(request, response);
    }

    private void showNewForm(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        request.getRequestDispatcher("expense-form.jsp").forward(request, response);
    }

    private void showEditForm(HttpServletRequest request, HttpServletResponse response) 
            throws SQLException, ServletException, IOException {
        int id = Integer.parseInt(request.getParameter("id"));
        Expense existingExpense = expenseDAO.getExpenseById(id);
        request.setAttribute("expense", existingExpense);
        request.getRequestDispatcher("expense-form.jsp").forward(request, response);
    }

    private void insertExpense(HttpServletRequest request, HttpServletResponse response) 
            throws SQLException, IOException {
        String title = request.getParameter("title");
        String category = request.getParameter("category");
        double amount = Double.parseDouble(request.getParameter("amount"));
        Date date = Date.valueOf(request.getParameter("date"));
        String description = request.getParameter("description");

        Expense newExpense = new Expense(0, title, category, amount, date, description);
        expenseDAO.addExpense(newExpense);
        response.sendRedirect("list");
    }

    private void updateExpense(HttpServletRequest request, HttpServletResponse response) 
            throws SQLException, IOException {
        int id = Integer.parseInt(request.getParameter("id"));
        String title = request.getParameter("title");
        String category = request.getParameter("category");
        double amount = Double.parseDouble(request.getParameter("amount"));
        Date date = Date.valueOf(request.getParameter("date"));
        String description = request.getParameter("description");

        Expense expense = new Expense(id, title, category, amount, date, description);
        expenseDAO.updateExpense(expense);
        response.sendRedirect("list");
    }

    private void deleteExpense(HttpServletRequest request, HttpServletResponse response) 
            throws SQLException, IOException {
        int id = Integer.parseInt(request.getParameter("id"));
        expenseDAO.deleteExpense(id);
        response.sendRedirect("list");
    }
}
