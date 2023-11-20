package model;

import java.beans.JavaBean;
import java.io.Serializable;
import java.util.ArrayList;

@JavaBean
public class PointsData implements Serializable {
    private ArrayList<PointData> data = new ArrayList<>();

    public ArrayList<PointData> getData() {
        return data;
    }

    public void setData(ArrayList<PointData> data) {
        this.data = data;
    }

    public void addPointsData(ArrayList<PointData> points) {
        data.addAll(points);
    }
}
