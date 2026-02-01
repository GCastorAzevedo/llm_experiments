class A:
    def __or__(self, value):
        left = getattr(self, "chain", self.__class__.__name__)
        print(left)
        value.chain = f"{left}.{value.__class__.__name__}"
        return value


class B:
    def __or__(self, value):
        left = getattr(self, "chain", self.__class__.__name__)
        print(left)
        value.chain = f"{left}.{value.__class__.__name__}"
        return value


class C:
    def __or__(self, value):
        left = getattr(self, "chain", self.__class__.__name__)
        print(left)
        return value


if __name__ == "__main__":
    a, b, c = A(), B(), C()
    # A.__or__(B) -> B
    # B.__or__(C) -> C
    # A | B | C = (A | B) | C =  (A.__or__(B)).__or__(C) = B.__or__(C) = C
    y = a | b | c
    print(y.chain)
