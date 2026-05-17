<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
    <title>Expense Tracker - <c:if test="${expense != null}">Edit</c:if><c:if test="${expense == null}">Add</c:if> Expense</title>
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    <div class="container">
        <h2>
            <c:if test="${expense != null}">Edit Expense</c:if>
            <c:if test="${expense == null}">Add New Expense</c:if>
        </h2>

        <form action="<c:if test='${expense != null}'>update</c:if><c:if test='${expense == null}'>insert</c:if>" method="post">
            
            <c:if test="${expense != null}">
                <input type="hidden" name="id" value="<c:out value='${expense.id}' />" />
            </c:if>

            <div>
                <label>Title:</label>
                <input type="text" name="title" value="<c:out value='${expense.title}' />" required>
            </div>

            <div>
                <label>Category:</label>
                <select name="category" required>
                    <option value="Food" <c:if test="${expense.category == 'Food'}">selected</c:if>>Food</option>
                    <option value="Travel" <c:if test="${expense.category == 'Travel'}">selected</c:if>>Travel</option>
                    <option value="Bills" <c:if test="${expense.category == 'Bills'}">selected</c:if>>Bills</option>
                    <option value="Shopping" <c:if test="${expense.category == 'Shopping'}">selected</c:if>>Shopping</option>
                    <option value="Other" <c:if test="${expense.category == 'Other'}">selected</c:if>>Other</option>
                </select>
            </div>

            <div>
                <label>Amount:</label>
                <input type="number" step="0.01" name="amount" value="<c:out value='${expense.amount}' />" required>
            </div>

            <div>
                <label>Date:</label>
                <input type="date" name="date" value="<c:out value='${expense.date}' />" required>
            </div>

            <div>
                <label>Description:</label>
                <textarea name="description" rows="3"><c:out value="${expense.description}" /></textarea>
            </div>

            <button type="submit" class="btn btn-success">Save</button>
            <a href="list" class="btn">Cancel</a>
        </form>
    </div>
</body>
</html>
