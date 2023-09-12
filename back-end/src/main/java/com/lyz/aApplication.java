package com.lyz;

import org.mybatis.spring.annotation.MapperScan;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication

@MapperScan("com.lyz.mapper")
public class aApplication {
    public static void main(String[] args) {
        SpringApplication.run(aApplication.class,args);
    }
}
