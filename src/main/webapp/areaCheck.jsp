<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page import="java.time.format.DateTimeFormatter" %>
<html>
<head>
    <jsp:include page="includes/extendedHead.jsp" />
    <title>Проверка попадания</title>
</head>
    <body>
        <div class="wrapper">
            <jsp:include page="includes/header.jsp" />
            <section>
                <a href="/${address}" id="main-page-button">На главную</a><br>
                <jsp:include page="includes/resultsArticle.jsp"/>
            </section>
        </div>
    </body>
</html>