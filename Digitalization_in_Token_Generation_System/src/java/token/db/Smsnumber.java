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
@Table(name = "smsnumber")
@NamedQueries(
{
    @NamedQuery(name = "Smsnumber.findAll", query = "SELECT s FROM Smsnumber s")
})
public class Smsnumber implements Serializable
{

    @Column(name = "tokenno")
    private Integer tokenno;

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    @Basic(optional = false)
    @Column(name = "mobileno")
    private String mobileno;
    @Column(name = "date")
    @Temporal(TemporalType.DATE)
    private Date date;

    public Smsnumber()
    {
    }

    public Smsnumber(Integer id)
    {
        this.id = id;
    }

    public Smsnumber(Integer id, String mobileno, Integer tokenno)
    {
        this.id = id;
        this.mobileno = mobileno;
        this.tokenno = tokenno;
    }

    public Integer getId()
    {
        return id;
    }

    public void setId(Integer id)
    {
        this.id = id;
    }

    public String getMobileno()
    {
        return mobileno;
    }

    public void setMobileno(String mobileno)
    {
        this.mobileno = mobileno;
    }


    public Date getDate()
    {
        return date;
    }

    public void setDate(Date date)
    {
        this.date = date;
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
        if (!(object instanceof Smsnumber))
        {
            return false;
        }
        Smsnumber other = (Smsnumber) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id)))
        {
            return false;
        }
        return true;
    }

    @Override
    public String toString()
    {
        return "token.db.Smsnumber[ id=" + id + " ]";
    }

    public Integer getTokenno()
    {
        return tokenno;
    }

    public void setTokenno(Integer tokenno)
    {
        this.tokenno = tokenno;
    }
    
}
