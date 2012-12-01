package com.mcbeath.life.commons;

public class Role extends BaseBean {
    private String roleId;
    private String roleName;
    private String roleDesc;//角色描述
    private boolean ckStatus;//选中状态
    
    public String getRoleId() {
      return roleId;
    }
    public void setRoleId(String roleId) {
      this.roleId = roleId;
    }
    public String getRoleName() {
      return roleName;
    }
    public void setRoleName(String roleName) {
      this.roleName = roleName;
    }
    public String getRoleDesc() {
      return roleDesc;
    }
    public void setRoleDesc(String roleDesc) {
      this.roleDesc = roleDesc;
    }
    public boolean isCkStatus() {
      return ckStatus;
    }
    public void setCkStatus(boolean ckStatus) {
      this.ckStatus = ckStatus;
    }
    
}
