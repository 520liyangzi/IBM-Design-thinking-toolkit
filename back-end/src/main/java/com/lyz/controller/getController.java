package com.lyz.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.lyz.mapper.TokenMapp;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

@RestController
@CrossOrigin(originPatterns = "*",allowedHeaders = "*",methods = {},allowCredentials = "true")
public class getController {

    @Resource
    TokenMapp tokenMapp;

    @PostMapping("/set/token")
    public void setToken(@RequestBody Token token){
        if (getToken(token.getTokenKey()).equals("null")){
            System.out.println(token);
            System.out.println("set o");
            tokenMapp.insert(token);
        }
    }

    @GetMapping("/get/token")
    public String getToken(String key){
        List<Token> tokenKey = tokenMapp.selectList(new QueryWrapper<Token>().eq("token_key", key));
        if (null == tokenKey || tokenKey.size() == 0){
            return null;
        }
        System.out.println(tokenKey.get(tokenKey.size() - 1).getTokenValue());
        return tokenKey.get(tokenKey.size() - 1).getTokenValue();
    }

    @PostMapping("/delete/token")
    public void deteleToken(String key){
        tokenMapp.delete(new QueryWrapper<Token>().eq("token_key",key));
    }
}
