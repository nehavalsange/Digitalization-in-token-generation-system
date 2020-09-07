/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package token.controllers;

import com.fasterxml.jackson.jr.ob.JSON;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author SHREE
 */
@Controller
public class HelloController
{
    @RequestMapping("/say")
    //@ResponseBody
    public String sayHello()
    {
        return "greeting";
    }

    @ResponseBody
    @RequestMapping("/gettoken")
    public String getToken() throws IOException
    {
        Map<String,Object> result=new HashMap<>();
        
        result.put("status","OK");
        result.put("token",1234);
        
        return JSON.std.asString(result);
    }
}
