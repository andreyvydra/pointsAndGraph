<%--
  Created by IntelliJ IDEA.
  User: vidra
  Date: 10/31/2023
  Time: 1:21 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<form id="form">
    <div class="x-input">
        X:
        <label>
            <input name="x" type="checkbox" value="-3">
            <span>-3</span>
        </label>
        <label>
            <input name="x" type="checkbox" value="-2">
            <span>-2</span>
        </label>
        <label>
            <input name="x" type="checkbox" value="-1">
            <span>-1</span>
        </label>
        <label>
            <input name="x" type="checkbox" value="0">
            <span>0</span>
        </label>
        <label>
            <input name="x" type="checkbox" value="1">
            <span>1</span>
        </label>
        <label>
            <input name="x" type="checkbox" value="2">
            <span>2</span>
        </label>
        <label>
            <input name="x" type="checkbox" value="3">
            <span>3</span>
        </label>
        <label>
            <input name="x" type="checkbox" value="4">
            <span>4</span>
        </label>
        <label>
            <input name="x" type="checkbox" value="5">
            <span>5</span>
        </label>
    </div>
    <div class="y-input">
        <label>Y:
            <input class="form-input" type="text" id="y-input"
            pattern="^-?\d*([.,]{1}\d*)?$" title="Введите число"
            required>
        </label>
    </div>
    <div class="r-input">
        <label>R:
            <input class="form-input" type="text" id="r-input"
            pattern="^-?\d*([.,]{1}\d*)?$"
            title="Введите число" required>
        </label>
    </div>
    <input class="submit-button" type="submit" value="Попытаться">
</form>
