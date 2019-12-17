var documenterSearchIndex = {"docs": [

{
    "location": "#",
    "page": "Home",
    "title": "Home",
    "category": "page",
    "text": ""
},

{
    "location": "#FlatBuffers.jl-Documentation-1",
    "page": "Home",
    "title": "FlatBuffers.jl Documentation",
    "category": "section",
    "text": ""
},

{
    "location": "#Overview-1",
    "page": "Home",
    "title": "Overview",
    "category": "section",
    "text": "FlatBuffers.jl provides native Julia support for reading and writing binary structures following the google flatbuffer schema (see here for a more in-depth review of the binary format).The typical language support for flatbuffers involves utilizing the flatc compiler to translate a flatbuffer schema file (.fbs) into a langugage-specific set of types/classes and methods. See here for the official guide on writing schemas.This Julia package contains serialization primitives and a minimal set of macros which provide flatbuffer-compatible serialization of existing Julia types. This has led to the Julia code appearing somewhat more readable than for other languages.For example, for this schema:namespace example;\n\ntable SimpleType {\n  x: int = 1;\n}\n\nroot_type SimpleType;the corresponding Julia looks like this:module Example\n\nusing FlatBuffers\n@with_kw mutable struct SimpleType\n    x::Int32 = 1\nend\n\n# ... other generated stuff\nendYou can pepper your existing Julia types with these macros and then call the functions below to produce flatbuffer-compatible binaries."
},

{
    "location": "#Usage-1",
    "page": "Home",
    "title": "Usage",
    "category": "section",
    "text": "FlatBuffers provides the following functions for reading and writing flatbuffers:FlatBuffers.serialize(stream::IO, value::T) \nFlatBuffers.deserialize(stream::IO, ::Type{T})These methods are not exported to avoid naming clashes with the Serialization module. For convenience, there are also two additional constructors defined for each generated type:T(buf::AbstractVector{UInt8}, pos::Integer=0)\nT(io::IO)Here is an example showing how to use them to serialize the example type above.import FlatBuffers, Example\n\n# create an instance of our type\nval = Example.SimpleType(2)\n\n# serialize it to example.bin\nopen(\"example.bin\", \"w\") do f FlatBuffers.serialize(f, val) end\n\n# read the value back again from file\nval2 = open(\"example.bin\", \"r\") do f\n  FlatBuffers.deserialize(f, Example.SimpleType)\nendIn addition, this package provides the following types and methods, which are useful when inspecting and constructing flatbuffers:FlatBuffers.Table{T} - type for deserializing a Julia type T from a flatbuffer\nFlatBuffers.Builder{T} - type for serializing a Julia type T to a flatbuffer\nFlatBuffers.read - performs the actual deserializing on a FlatBuffer.Table\nFlatBuffers.build! - performs the actual serializing on a FlatBuffer.Builder"
},

{
    "location": "#Additional-Methods-1",
    "page": "Home",
    "title": "Additional Methods",
    "category": "section",
    "text": "For a type T it is also possible to define:FlatBuffers.file_extension(T) - returns the file_extension specified in the schema (if any)\nFlatBuffers.file_identifier(T) - returns the file_identifier specified in the schema (if any)\nFlatBuffers.has_identifier(T, bytes) - returns whether the given bytes contain the identifier for T at the offset designated by the flatbuffers specification\nFlatBuffers.slot_offsets(T) - an array containing the positions of the slots in the vtable for type T, accounting for gaps caused by deprecated fields\nFlatBuffers.root_type(T) - returns whether the type is designated as the root type by the schema. Also note however that no root_type definition is necessary in Julia; any of the generated mutable structs can be a valid root table type."
},

{
    "location": "#State-of-flatc-integration-1",
    "page": "Home",
    "title": "State of flatc integration",
    "category": "section",
    "text": "It was hoped that support for Julia could be added to flatc, however this is difficult with the current approach due to  https://github.com/JuliaLang/julia/issues/269. This package will require a rethink, or potentially a completely separate package may be created. The most up-to-date fork of flatc with support for Julia may be found here: https://github.com/rjkat/flatbuffers-julia"
},

{
    "location": "#Advanced-utilities-1",
    "page": "Home",
    "title": "Advanced utilities",
    "category": "section",
    "text": "Documentation is also included for many internal methods and may be queried using ? at the REPL.@ALIGN T size_in_bytes - convenience macro for forcing a flatbuffer alignment on the Julia type T to size_in_bytes\n@with_kw mutable struct T fields... - convenience macro for defining default field values for Julia type T\n@UNION T Union{T1,T2,...} - convenience macro for defining a flatbuffer union type T\n@STRUCT struct T fields... end - convenience macro for defining flatbuffer struct types, ensuring any necessary padding gets added to the type definition"
},

]}
