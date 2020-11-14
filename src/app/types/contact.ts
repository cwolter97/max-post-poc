export type ContactEvent = CallContactEvent | TextContactEvent | WorkItemContactEvent;

type booleanString = "True" | "False";

export type ContactStatus =
  | "Incoming"
  | "Ringing"
  | "Dialing"
  | "Active"
  | "Holding"
  | "Joined"
  | "Disconnected"
  | "CallBackDisconnected"
  | "Preview"
  | "Masking"
  | "NaturalCallRinging"
  | "NaturalCallAMD"
  | "NaturalCallDialing";

export type CallType =
  | "Regular"
  | "AgentLeg"
  | "ReskillProxy"
  | "Consult"
  | "PersonalQueue"
  | "Dialer"
  | "TakeOver"
  | "NaturalCalling";

interface SessionEvent {
  type: string;
  IISHost: string;
  VCHost: string;
}

interface GenericContactEvent extends SessionEvent {
  ContactID: string;
  Status: ContactStatus;
  OriginalState: booleanString;
  Skill: string;
  StartTimeUTC: string;
  LastStateChangeTimeUTC: string;
  ScreenPopUrl: string;
  FinalState: string;
}

export interface CallContactEvent extends GenericContactEvent {
  Type: "CallContactEvent";
  ContactID: string;
  Status: ContactStatus;
  OriginalState: booleanString;
  CallType: CallType;
  DNIS: string;
  ANI: string;
  Skill: string;
  IsInbound: booleanString;
  StartTimeUTC: string;
  LastStateChangeTimeUTC: string;
  ScreenPopUrl: string;
  DisconnectCode: string;
  IsLogging: booleanString;
  Timeout: string;
  AllowDispositions: booleanString;
  Label: string;
  IsLinked: booleanString;
  TimeZones: string;
  FinalState: booleanString;
  OtherInformation: string;
  BlendingToSkillName: string;
}

export interface WorkItemContactEvent extends GenericContactEvent {
  Type: "WorkItemContactEvent";
  ContactID: string;
  Status: ContactStatus;
  WorkItemId: string;
  WorkItemPayload: string;
  WorkItemType: string;
  AgentId: string;
  SkillId: string;
  StartTimeUTC: string;
  LastStateChangeTimeUTC: string;
  ScreenPopUrl: string;
  ScreenPopUrlVariables: string;
  RefusalTimeout: string;
  FinalState: booleanString;
}
//  previously referred to as "Chat", ambiguously changed to "Text"
//  used for SMS conversations as well as Chat
export interface TextContactEvent extends GenericContactEvent {
  Type: "TextContactEvent";
  ContactID: string;
  RoomId: string;
  Status: ContactStatus;
  Skill: string;
  StartTime: string;
  LastStateChangeTime: string;
  ScreenPopUrl: string;
  RefusalTimeout: string;
  IsActive: booleanString;
  MasterID: string;
  CustomData: string;
  ParentContactId: string;
  OmniGroupId?: string;
  InFocus: booleanString;
  PointOfContactAddress: string;
  FromAddress: string;
  FinalState: booleanString;
  CustomerCardUrl: string;
}
