/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package token.db;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

/**
 *
 * @author SHREE
 */
@Entity
@Table(name = "users")
@NamedQueries(
{
    @NamedQuery(name = "Users.findAll", query = "SELECT u FROM Users u")
})
public class Users implements Serializable
{

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "user_id")
    private Integer userId;
    @Basic(optional = false)
    @Column(name = "name")
    private String name;
    @Basic(optional = false)
    @Column(name = "user_name")
    private String userName;
    @Column(name = "passwordhash")
    private String passwordhash;
    @Column(name = "role")
    private String role;

    public Users()
    {
    }

    public Users(Integer userId)
    {
        this.userId = userId;
    }

    public Users(Integer userId, String name, String userName)
    {
        this.userId = userId;
        this.name = name;
        this.userName = userName;
    }

    public Integer getUserId()
    {
        return userId;
    }

    public void setUserId(Integer userId)
    {
        this.userId = userId;
    }

    public String getName()
    {
        return name;
    }

    public void setName(String name)
    {
        this.name = name;
    }

    public String getUserName()
    {
        return userName;
    }

    public void setUserName(String userName)
    {
        this.userName = userName;
    }

    public String getPasswordhash()
    {
        return passwordhash;
    }

    public void setPasswordhash(String passwordhash)
    {
        this.passwordhash = passwordhash;
    }

    public String getRole()
    {
        return role;
    }

    public void setRole(String role)
    {
        this.role = role;
    }

    @Override
    public int hashCode()
    {
        int hash = 0;
        hash += (userId != null ? userId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object)
    {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Users))
        {
            return false;
        }
        Users other = (Users) object;
        if ((this.userId == null && other.userId != null) || (this.userId != null && !this.userId.equals(other.userId)))
        {
            return false;
        }
        return true;
    }

    @Override
    public String toString()
    {
        return "token.db.Users[ userId=" + userId + " ]";
    }
    
}
