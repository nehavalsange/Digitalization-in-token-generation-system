/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package token.db;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 *
 * @author SHREE
 */
@Entity
@Table(name = "window_status")
@NamedQueries(
{
    @NamedQuery(name = "WindowStatus.findAll", query = "SELECT w FROM WindowStatus w")
})
public class WindowStatus implements Serializable
{

    private static final long serialVersionUID = 1L;
    @Basic(optional = false)
    @Column(name = "window_no")
    private int windowNo;
    @Column(name = "current_token")
    private Integer currentToken;
    @Column(name = "date")
    @Temporal(TemporalType.DATE)
    private Date date;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;

    public WindowStatus()
    {
    }

    public WindowStatus(Integer id)
    {
        this.id = id;
    }

    public WindowStatus(Integer id, int windowNo)
    {
        this.id = id;
        this.windowNo = windowNo;
    }

    public int getWindowNo()
    {
        return windowNo;
    }

    public void setWindowNo(int windowNo)
    {
        this.windowNo = windowNo;
    }

    public Integer getCurrentToken()
    {
        return currentToken;
    }

    public void setCurrentToken(Integer currentToken)
    {
        this.currentToken = currentToken;
    }

    public Date getDate()
    {
        return date;
    }

    public void setDate(Date date)
    {
        this.date = date;
    }

    public Integer getId()
    {
        return id;
    }

    public void setId(Integer id)
    {
        this.id = id;
    }

    @Override
    public int hashCode()
    {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object)
    {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof WindowStatus))
        {
            return false;
        }
        WindowStatus other = (WindowStatus) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id)))
        {
            return false;
        }
        return true;
    }

    @Override
    public String toString()
    {
        return "token.db.WindowStatus[ id=" + id + " ]";
    }
    
}
