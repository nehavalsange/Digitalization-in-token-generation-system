/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package token.controllers;

import com.fasterxml.jackson.jr.ob.JSON;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate4.HibernateTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import static token.controllers.NonSmartPhoneUserSMS.sendSMS;
import token.db.Smsnumber;
import token.db.Token;
import token.db.Users;
import token.db.WindowStatus;

/**
 *
 * @author SHREE
 */
@Controller
public class ServiceController
{

    @Autowired
    HibernateTemplate hibernateTemplate;

    @ResponseBody
    @RequestMapping(value = "login_token")
    public String loginTokenGenerator(HttpServletRequest request) throws Exception
    {
        String body = getRequestBody(request);

        Map<String, Object> map = JSON.std.mapFrom(body);

        String username = (String) map.get("username");
        String password = (String) map.get("password");

        List<Users> list = (List<Users>) (List<?>) hibernateTemplate.find("from Users u where u.userName=? and u.passwordhash=?", username, password);

        Map<String, Object> response = new HashMap<>();

        if (list.isEmpty())
        {
            response.put("status", "failed");
            response.put("message", "Invalid username or password");
        } else
        {
            response.put("status", "success");
            final Users user = list.get(0);
            user.setPasswordhash(null);
            response.put("user", user);
        }

        return JSON.std.asString(response);
    }

    
    @ResponseBody
    @RequestMapping(value = "getoperator")
    public String Getoperator(HttpServletRequest request) throws Exception
    {
        String body = getRequestBody(request);

        Map<String, Object> map = JSON.std.mapFrom(body);

       Integer userid ;
        userid = (Integer) map.get("userId");
    
        List<Users> list = (List<Users>) (List<?>) hibernateTemplate.find("from Users u where u.userId=?", userid);

        Map<String, Object> response = new HashMap<>();

        if (list.isEmpty())
        {
            response.put("status", "failed");
            response.put("message", "Invalid userId");
        } else
        {
            response.put("status", "success");
            final Users user = list.get(0);
          //  user.setPasswordhash(null);
            response.put("user", user);
        }

        return JSON.std.asString(response);
    }

    
    @Transactional
    @ResponseBody
    @RequestMapping(value = "addnewoperator")
    public String AddNewOperator(HttpServletRequest request) throws Exception
    {
        String body = getRequestBody(request);

        Map<String, Object> map = JSON.std.mapFrom(body);

        String username = (String) map.get("username");
        String password = (String) map.get("password");
        String name = (String) map.get("name");
        String role = (String) map.get("role");
        Users user = new Users();
        user.setName(name);
        user.setPasswordhash(password);
        user.setUserName(username);
        user.setRole(role);
        Map<String, Object> response = new HashMap<>();
        try
        {
            hibernateTemplate.save(user);
            response.put("status", "success");
        } catch (Exception e)
        {
            e.printStackTrace();
            response.put("status", "failed");
            response.put("message", "error");
        }

        return JSON.std.asString(response);
    }

    @Transactional
    @ResponseBody
    @RequestMapping(value = "editoperator")
    public String EditOperator(HttpServletRequest request) throws Exception
    {
        String body = getRequestBody(request);

        Map<String, Object> map = JSON.std.mapFrom(body);

        String username = (String) map.get("username");
        String password = (String) map.get("password");
        String name = (String) map.get("name");
        String role = (String) map.get("role");
        Integer userid ;
        userid = (Integer) map.get("userId");
        
         List<Users> list = (List<Users>) (List<?>) hibernateTemplate.find("from Users u where u.userId=? ", userid);

        final Users user = list.get(0);

        user.setName(name);
        user.setPasswordhash(password);
        user.setUserName(username);
        user.setRole(role);
        
        Map<String, Object> response = new HashMap<>();
        try
        {
            hibernateTemplate.update(user);
            response.put("status", "success");
        } catch (Exception e)
        {
            e.printStackTrace();
            response.put("status", "failed");
            response.put("message", "error");
        }

        return JSON.std.asString(response);
    }

    
    
    @Transactional
    @ResponseBody
    @RequestMapping(value = "deleteoperator")
    public String DeleteOperator(HttpServletRequest request) throws Exception
    {
        String body = getRequestBody(request);

        Map<String, Object> map = JSON.std.mapFrom(body);

        Integer userid ;
        userid = (Integer) map.get("userId");
        List<Users> list = (List<Users>) (List<?>) hibernateTemplate.find("from Users u where u.userId=? ", userid);

        final Users user = list.get(0);
        Map<String, Object> response = new HashMap<>();
        try
        {
            hibernateTemplate.delete(user);
            response.put("status", "success");
        } catch (Exception e)
        {
            e.printStackTrace();
            response.put("status", "failed");
            response.put("message", "error");
        }

        return JSON.std.asString(response);
    }

    @Transactional
    @ResponseBody
    @RequestMapping(value = "nexttoken", method = RequestMethod.POST)
    public String nextToken(HttpServletRequest request) throws Exception
    {
        String body = getRequestBody(request);

        Map<String, Object> map1 = JSON.std.mapFrom(body);
        String mobileno = (String) map1.get("mobileno");

        
        Map<String, Object> map = new HashMap<>();
        
        int token = 0;
        Date d = new Date();
        List<Token> list = (List<Token>) (List<?>) hibernateTemplate.find("from Token t where t.date=?", d);
        if (list.isEmpty())
        {
            Token t = new Token();
            t.setDate(d);
            t.setCurrentToken(token = 1);

            hibernateTemplate.save(t);
            map.put("status", "success");
            map.put("token", 1);
            
            Smsnumber newobj = new Smsnumber();
            newobj.setDate(d);
            newobj.setMobileno(mobileno);
            newobj.setTokenno(t.getCurrentToken());
            hibernateTemplate.save(newobj);
            
        } else
        {
            token = list.get(0).getCurrentToken();
            token++;
            if (token <= 200)
            {
                list.get(0).setCurrentToken(token);
                map.put("status", "success");
                map.put("token", token);
                
                Smsnumber newobj = new Smsnumber();
                newobj.setDate(d);
                newobj.setMobileno(mobileno);
                newobj.setTokenno(token-1);
                hibernateTemplate.save(newobj);
                
            } else
            {
                map.put("status", "failed");
                map.put("message", "Token limit reached");
            }
        }
        return JSON.std.asString(map);
    }

    @Transactional
    @ResponseBody
    @RequestMapping(value = "nexttokenforwindow", method = RequestMethod.POST)
    public String nextTokenforWindow(HttpServletRequest request) throws Exception
    {
        String body = getRequestBody(request);

        Map<String, Object> map1 = JSON.std.mapFrom(body);

        String windowno = (String) map1.get("windowno");
        int wno = Integer.parseInt(windowno);
        Map<String, Object> map = new HashMap<>();
//        int token = 0;
        Date d = new Date();
        try
        {
            List<WindowStatus> list = (List<WindowStatus>) (List<?>) hibernateTemplate.find("from WindowStatus t where t.date=?", d);
            List<Token> list1 = (List<Token>) (List<?>) hibernateTemplate.find("from Token t where t.date=?", d);
            if (list.isEmpty())
            {
                WindowStatus t = new WindowStatus();
                t.setDate(d);
                t.setCurrentToken( 1);
                t.setWindowNo(wno);
                hibernateTemplate.save(t);
                map.put("status", "success");
                map.put("token", 1);
                List<Smsnumber> listuser1 = (List<Smsnumber>) (List<?>) hibernateTemplate.find("from Smsnumber s where s.date=? and s.tokenno=?", d, (t.getCurrentToken()+5));
                sendSMS("Current token:1",listuser1.get(0).getMobileno());
                sendSMS("Current token:1 \n Your token:"+listuser1.get(0).getTokenno(),listuser1.get(0).getMobileno());
                    
            } else
            {
                int max = 1;
                for (int i = 0; i < list.size(); i++)
                {
                    int m = list.get(i).getCurrentToken();
                    if (m > max)
                    {
                        max = m;
                    }
                }
                max++;

                int count = 0;
                for (int i = 0; i < list.size(); i++)
                {
                    int windown = list.get(i).getWindowNo();
                    if (wno == windown)
                    {

                        int t1 = list1.get(0).getCurrentToken();
                        if (max <= t1)
                        {
                            list.get(i).setCurrentToken(max);
                            map.put("status", "success token no "+(max+5));
                            map.put("token", max);
                            List<Smsnumber> listuser2 = (List<Smsnumber>) (List<?>) hibernateTemplate.find("from Smsnumber s where s.date=? and s.tokenno=?", d, (max+5));
                     sendSMS("Current token:"+max+"\nYour token:"+listuser2.get(0).getTokenno(),listuser2.get(0).getMobileno());
                        } else
                        {
                            map.put("status", "failed");
                            map.put("message", "Token limit reached");
                        }
                        count = 1;
                        break;
                    }

                }
                if (count == 0)
                {
                    int t2 = list1.get(0).getCurrentToken();
                    if (max <= t2)
                    {
                        WindowStatus newobj = new WindowStatus();
                        newobj.setDate(d);
                        newobj.setWindowNo(wno);
                        newobj.setCurrentToken(max);
                        hibernateTemplate.save(newobj);
                        map.put("status", "success");
                        map.put("token", max);                                               
                        List<Smsnumber> listuser3 = (List<Smsnumber>) (List<?>) hibernateTemplate.find("from Smsnumber s where s.date=? and s.tokenno=?", d, (max+5));
                        sendSMS("Current token:"+max+"\nYour token:"+listuser3.get(0).getTokenno(),listuser3.get(0).getMobileno());
                    
                    } else
                    {
                        map.put("status", "failed");
                        map.put("message", "Token limit reached");
                    }

                }

            }
        } catch (Exception e2)
        {
            e2.printStackTrace();

        }
        return JSON.std.asString(map);
    }

     @ResponseBody
    @RequestMapping(value = "windowstatuses")
    public String windowStatuses(HttpServletRequest request) throws Exception
    {
       

         Date d = new Date();
        List<WindowStatus> list = (List<WindowStatus>) (List<?>) hibernateTemplate.find("from WindowStatus u where u.date=?", d);

        Map<String, Object> response = new HashMap<>();
        
        if (list.isEmpty())
        {
            response.put("status", "failed");
            response.put("message", "Invalid username or password");
        } else
        {
            response.put("status", "success");
            response.put("windowStatuses", list);
        }

        return JSON.std.asString(response);
    }
    
       @ResponseBody
    @RequestMapping(value = "userDetails")
    public String userDetails(HttpServletRequest request) throws Exception
    {
       

        List<Users> list = (List<Users>) (List<?>) hibernateTemplate.find("from Users u");

        Map<String, Object> response = new HashMap<>();
        
        if (list.isEmpty())
        {
            response.put("status", "failed");
            response.put("message", "Invalid username or password");
        } else
        {
            response.put("status", "success");
            response.put("userdetails", list);
        }

        return JSON.std.asString(response);
    }
  
    
    private static String getRequestBody(HttpServletRequest request) throws Exception
    {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        byte[] b = new byte[10240];
        int n;

        InputStream is = request.getInputStream();

        while ((n = is.read(b)) != -1)
        {
            baos.write(b, 0, n);
        }

        b = baos.toByteArray();
        return new String(b, "UTF-8");
    }
}
