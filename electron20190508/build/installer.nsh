!macro preInit
  SetRegView 64
  WriteRegExpandStr HKLM "${INSTALL_REGISTRY_KEY}" InstallLocation "D:\IMS"
  WriteRegExpandStr HKCU "${INSTALL_REGISTRY_KEY}" InstallLocation "D:\IMS"
  SetRegView 32
  WriteRegExpandStr HKLM "${INSTALL_REGISTRY_KEY}" InstallLocation "D:\IMS"
  WriteRegExpandStr HKCU "${INSTALL_REGISTRY_KEY}" InstallLocation "D:\IMS"
!macroend
