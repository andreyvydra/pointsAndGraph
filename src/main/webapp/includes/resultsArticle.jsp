<%--
  Created by IntelliJ IDEA.
  User: vidra
  Date: 10/31/2023
  Time: 1:24 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<jsp:useBean id="points" class="model.PointsData" scope="session" />
<%@ page import="java.time.format.DateTimeFormatter" %>
<article class="second-article">
    <div class="block results">
        <table class="table-results">
            <thead>
            <tr>
                <th>X</th>
                <th>Y</th>
                <th>R</th>
                <th>Результат</th>
                <th>Время выполнения, мкс</th>
                <th>Дата старта</th>
            </tr>
            </thead>
            <tbody id="table-body">
                <c:forEach var="point" items="${points.data}">
                    <tr>
                        <td>${point.x}</td>
                        <td>${point.y}</td>
                        <td>${point.r}</td>
                        <td>${point.inArea}</td>
                        <td>${point.calculationTime}</td>
                        <td>${point.calculatedAt.format(DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss"))}</td>
                    </tr>
                </c:forEach>
            </tbody>
        </table>
    </div>
</article>
