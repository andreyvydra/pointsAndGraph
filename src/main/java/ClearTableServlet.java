import com.google.gson.Gson;
import com.google.gson.JsonObject;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.Objects;

public class ClearTableServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        HttpSession httpSession = req.getSession();
        Gson gson = new Gson();
        JsonObject jo = new JsonObject();
        if (!Objects.isNull(httpSession.getAttribute("points"))) {
            httpSession.removeAttribute("points");
            jo.addProperty("result", "cleaned");
        } else {
            jo.addProperty("result", "no");
        }
        resp.getWriter().write(gson.toJson(jo));
    }
}
