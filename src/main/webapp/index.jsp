<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<html>
<head>
    <jsp:include page="includes/head.jsp" />
    <title>Сайтик</title>
</head>
<body>
    <div class="wrapper">
        <jsp:include page="includes/header.jsp" />
        <section>
            <jsp:include page="includes/formArticle.jsp"/>
            <jsp:include page="includes/resultsArticle.jsp"/>
        </section>
    </div>
    <script src="dist/main.js"></script>
</body>
</html>
