
import enum
import location

class TokenType(enum.Enum):
  Identifier = 1

  ValueNumber = 2
  ValueString = 3
  ValueBoolean = 4
  ValueFloat = 5

  SymAt = 6
  SymDot = 7
  SymHash = 8
  SymComma = 9
  SymColon = 10
  SymDollar = 12
  SymQuestion = 13
  SymSemiColon = 14

  BracketLcurly = 15
  BracketRcurly = 16
  BracketLparent = 17
  BracketRparent = 18
  BracketRsquared = 19
  BracketLsquared = 20

  OpMul = 21
  OpMod = 22
  OpDiv = 23
  OpPlus = 24
  OpMinus = 25
  OpMuleq = 26
  OpDiveq = 27
  OpModEq = 28
  OpPluseq = 29
  OpMinuseq = 30
  OpGt = 31
  OpLt = 32
  OpArrow = 33
  OpEqeq = 34
  OpGteq = 35
  OpLteq = 36
  OpNoteq = 37
  OpEq = 38
  OpNot = 39
  OpAnd = 40
  OpOr = 41
  OpBitNot = 42
  OpBitOr = 43
  OpBitAnd = 44
  OpBitXor = 45
  OpBitOrEq = 46
  OpBitRshift = 47
  OpBitLshift = 48
  OpBitAndEq = 49
  OpBitXorEq = 50
  OpBitRshiftEq = 51
  OpBitLshiftEq = 52

  KeywordIf = 53
  KeywordElse = 54
  KeywordWhile = 55
  KeywordLet = 56
  KeywordFn = 57

class Token(location.LocationHolder):
  def __init__(self, type: TokenType, value: str):
    self.type = type
    self.value = value

