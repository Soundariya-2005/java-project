<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
    <title>Expense Tracker - Dashboard</title>
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    <div class="container">
        <h2>My Expenses</h2>
        <a href="new" class="btn btn-success">Add New Expense</a>
        
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <c:forEach var="expense" items="${listExpense}">
                    <tr>
                        <td><c:out value="${expense.title}" /></td>
                        <td><c:out value="${expense.category}" /></td>
                        <td>$<c:out value="${expense.amount}" /></td>
                        <td><c:out value="${expense.date}" /></td>
                        <td><c:out value="${expense.description}" /></td>
                        <td>
                            <a href="edit?id=<c:out value='${expense.id}' />">Edit</a>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <a href="delete?id=<c:out value='${expense.id}' />" 
                               style="color:red;" 
                               onclick="return confirm('Delete this expense?')">Delete</a>
                        </td>
                    </tr>
                </c:forEach>
            </tbody>
        </table>
    </div>
</body>
</html>
