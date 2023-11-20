import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Objects;

import static core.Constants.*;

public class ControllerServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String path = this.getServletContext().getContextPath();

        String action = req.getParameter(ACTION_FIELD);
        if (!Objects.isNull(action) && action.equals("clear")) {
            req.getRequestDispatcher("/clear").include(req, resp);
            return;
        }

        String x = req.getParameter(X_FIELD);
        String y = req.getParameter(Y_FIELD);
        String r = req.getParameter(R_FIELD);
        if (!Objects.isNull(x) && !Objects.isNull(y) && !Objects.isNull(r) && !Objects.isNull(action)) {
            path += "/areaCheck?" + ACTION_FIELD + "=" + action +
                    "&" + X_FIELD + "=" + x + "&" + Y_FIELD + "=" + y + "&" + R_FIELD + "=" + r;
        }

        resp.sendRedirect(path);
    }
}
