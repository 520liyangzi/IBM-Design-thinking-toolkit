package com.lyz.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;

import com.lyz.controller.Token;
import org.apache.ibatis.annotations.Select;


public interface TokenMapp extends BaseMapper<Token> {

    @Select("insert into token values(null,key,value)")
    void set(String key,String value);
}
