<%--
  Created by IntelliJ IDEA.
  User: vidra
  Date: 10/31/2023
  Time: 1:23 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<article class="first-article">
    <div class="block field">
        <canvas id="graph-canvas" width="250px" height="250px"></canvas>
    </div>
    <div class="block input">
        <jsp:include page="form.jsp"/>
        <button class="clear-table-button">Очистить таблицу</button>
    </div>
</article>
