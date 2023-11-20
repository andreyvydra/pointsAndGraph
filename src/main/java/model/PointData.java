package model;

import java.beans.JavaBean;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@JavaBean
public class PointData implements Serializable {
    private BigDecimal x;
    private BigDecimal y;
    private BigDecimal r;
    private boolean inArea;
    private double calculationTime;
    private LocalDateTime calculatedAt;

    public void setX(BigDecimal x) {
        this.x = x;
    }

    public void setY(BigDecimal y) {
        this.y = y;
    }

    public void setR(BigDecimal r) {
        this.r = r;
    }

    public void setInArea(boolean inArea) {
        this.inArea = inArea;
    }

    public void setCalculatedAt(LocalDateTime calculatedAt) {
        this.calculatedAt = calculatedAt;
    }

    public void setCalculationTime(double calculationTime) {
        this.calculationTime = calculationTime;
    }

    public BigDecimal getX() {
        return x;
    }

    public BigDecimal getY() {
        return y;
    }

    public BigDecimal getR() {
        return r;
    }

    public boolean isInArea() {
        return inArea;
    }

    public LocalDateTime getCalculatedAt() {
        return calculatedAt;
    }

    public double getCalculationTime() {
        return calculationTime;
    }
}

