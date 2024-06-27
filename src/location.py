
class Source:
  path: str = ""

  def __init__(self, path: str):
    self.path = path

  def __str__(self):
    return self.path

class Location:
  line: int = 0
  column: int = 0
  source: Source

  def __init__(self, source: Source, line: int, column: int):
    self.source = source
    self.line = line
    self.column = column

  def __str__(self):
    return f"{self.source}:{self.line}:{self.column}"
  
  def __repr__(self):
    return self.__str__()
  
  def __eq__(self, other):
    return self.source == other.source and self.line == other.line and self.column == other.column

class LocationHolder:
  location: Location

  def __init__(self, location: Location):
    self.location = location

  def get_location(self):
    return self.location
  