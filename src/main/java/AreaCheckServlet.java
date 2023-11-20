import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import core.LocalDateTimeAdapter;
import model.PointData;
import model.PointsData;

import javax.servlet.*;
import javax.servlet.http.*;
import java.io.IOException;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Objects;

import static core.Constants.*;

public class AreaCheckServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
            PointsData data = getPointsData(request);
            ArrayList<PointData> points = getRequestPoints(request);
            data.addPointsData(points);
            if (request.getParameter(ACTION_FIELD).equals("form")) {
                request.setAttribute("address", this.getServletContext().getContextPath());
                request.getRequestDispatcher("/areaCheck.jsp").forward(request, response);
            } else if (request.getParameter(ACTION_FIELD).equals("click")) {
                Gson gson = new GsonBuilder()
                        .registerTypeAdapter(LocalDateTime.class, new LocalDateTimeAdapter())
                        .create();
                response.getWriter().write(gson.toJson(points));
            } else {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            }
        } catch (NumberFormatException e) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        }
    }

    protected PointsData getPointsData(HttpServletRequest request) {
        HttpSession currentSession = request.getSession();
        PointsData data = (PointsData) currentSession.getAttribute("points");
        if (Objects.isNull(data)) {
            data = new PointsData();
            currentSession.setAttribute("points", data);
        }
        return data;
    }

    protected ArrayList<PointData> getRequestPoints(HttpServletRequest request) {
        String[] xArray = request.getParameter(X_FIELD).split(";");
        ArrayList<PointData> points = new ArrayList<>();
        for (String s : xArray) {
            LocalDateTime now = LocalDateTime.now();
            long start = System.nanoTime();

            BigDecimal x = new BigDecimal(s);
            BigDecimal y = new BigDecimal(request.getParameter(Y_FIELD));
            BigDecimal r = new BigDecimal(request.getParameter(R_FIELD));
            boolean inArea = checkInArea(x, y, r);

            PointData point = new PointData();
            point.setX(x);
            point.setY(y);
            point.setR(r);
            point.setInArea(inArea);
            point.setCalculatedAt(now);
            point.setCalculationTime((System.nanoTime() - start) / 1000.0);
            points.add(point);
        }
        return points;
    }

    protected boolean checkInArea(BigDecimal x, BigDecimal y, BigDecimal r) {
        if (y.compareTo(BigDecimal.ZERO) == 0) {
            return -r.compareTo(x) <= 0 && x.compareTo(r) <= 0;
        } else if (x.compareTo(BigDecimal.ZERO) == 0) {
            return -r.compareTo(x) <= 0 && x.compareTo(r.divide(BigDecimal.valueOf(2))) <= 0;
        }
        if (x.compareTo(BigDecimal.ZERO) < 0 && y.compareTo(BigDecimal.ZERO) > 0) {
            return x.compareTo(r.negate()) >= 0 && y.compareTo(r) <= 0;
        } else if (x.compareTo(BigDecimal.ZERO) < 0 && y.compareTo(BigDecimal.ZERO) < 0) {
            return x.multiply(x).add(y.multiply(y)).compareTo(r.multiply(r)) <= 0;
        } else if (x.compareTo(BigDecimal.ZERO) > 0 && y.compareTo(BigDecimal.ZERO) > 0) {
            return y.compareTo(x.negate().add(r.divide(BigDecimal.valueOf(2)))) <= 0;
        }
        return false;
    }
}
