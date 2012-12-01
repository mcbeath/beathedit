package com.mcbeath.life.user.service.jdbc;

import java.util.List;

import com.mcbeath.life.commons.User;

public interface JdbcUserService {
  /**
   * 修改用户
   * 
   * @param user
   * @return
   */
  String update(User user);

  /**
   * 新增用户
   * 
   * @param user
   * @return
   */
  String add(User user);

  /**
   * 根据用户id获取用户信心
   * 
   * @param userId
   * @return
   */
  User getUser(String userId);

  /**
   * 查询用户列表
   * 
   * @param user
   * @return
   */
  List<User> listUser(User user);

  /**
   * 根据用户id删除用户
   * 
   * @param userIds
   * @return
   */
  String delete(String[] userIds);
}
