package com.lyz.controller;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Token {
    Long id;
    String tokenKey;
    String tokenValue;
}
